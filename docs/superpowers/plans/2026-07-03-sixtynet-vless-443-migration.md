---
type: implementation-plan
status: approved
created: 2026-07-03
updated: 2026-07-03
tags:
  - sixtynet
  - xray
  - vless
  - operations
---

# SixtyNet VLESS 443 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore reliable X and YouTube access through the Shadowrocket `Sixtynet` VLESS/REALITY node.

**Architecture:** Keep production Xray on 8443 while a second process validates the same configuration on 443. Promote only after a full client-side test succeeds; otherwise remove the candidate listener and retain production unchanged.

**Tech Stack:** Debian 12, Xray VLESS/REALITY, systemd, UFW, Shadowrocket, curl.

---

### Task 1: Preserve the RED baseline and verify preconditions

**Files:**
- Remote read: `/usr/local/etc/xray/config.json`
- Remote backup: `/usr/local/etc/xray/config.json.bak-<timestamp>`

- [ ] **Step 1: Record the existing failing behavior**

With Shadowrocket using `Sixtynet` on 8443, run:

```bash
curl -4sS -o /dev/null --max-time 20 \
  -w 'http=%{http_code} total=%{time_total}s\n' https://x.com/
curl -4sS -o /dev/null --max-time 20 \
  -w 'http=%{http_code} total=%{time_total}s\n' https://www.youtube.com/
```

Expected RED result: both commands fail during TLS negotiation and report HTTP `000`.

- [ ] **Step 2: Verify port 443 is free and production config is valid**

```bash
ssh sixtynet '
  ! ss -lnt | grep -q ":443 "
  xray run -test -config /usr/local/etc/xray/config.json
  systemctl is-active --quiet xray
'
```

Expected: exit 0, `Configuration OK`, and no 443 listener.

- [ ] **Step 3: Create a timestamped production backup**

```bash
ssh sixtynet '
  ts=$(date +%Y%m%d-%H%M%S)
  cp -a /usr/local/etc/xray/config.json \
    "/usr/local/etc/xray/config.json.bak-$ts"
  echo "$ts" >/tmp/xray-443-backup-id
'
```

Expected: exit 0 and a backup with unchanged ownership and mode.

### Task 2: Start an isolated 443 candidate

**Files:**
- Create remote temporary config: `/tmp/xray-443-test.json`
- Create remote temporary log: `/tmp/xray-443-test.log`
- Create remote PID file: `/tmp/xray-443-test.pid`

- [ ] **Step 1: Derive and validate a port-only candidate**

```bash
ssh sixtynet '
  sed "0,/\"port\"[[:space:]]*:[[:space:]]*8443/s//\"port\": 443/" \
    /usr/local/etc/xray/config.json >/tmp/xray-443-test.json
  diff -u /usr/local/etc/xray/config.json /tmp/xray-443-test.json || true
  xray run -test -config /tmp/xray-443-test.json
'
```

Expected: the diff changes only `8443` to `443`; validation reports `Configuration OK`.

- [ ] **Step 2: Allow 443 and start the candidate**

```bash
ssh sixtynet '
  ufw allow 443/tcp comment "Xray VLESS REALITY"
  nohup /usr/local/bin/xray run -config /tmp/xray-443-test.json \
    >/tmp/xray-443-test.log 2>&1 </dev/null &
  echo $! >/tmp/xray-443-test.pid
'
```

Expected: exit 0.

- [ ] **Step 3: Verify candidate health**

```bash
ssh sixtynet '
  sleep 1
  kill -0 "$(cat /tmp/xray-443-test.pid)"
  ss -lntp | grep ":443 "
  tail -n 20 /tmp/xray-443-test.log
'
```

Expected: Xray owns 443 and the log contains no startup error.

### Task 3: Test 443 end to end

**Files:**
- Modify through UI: Shadowrocket `Sixtynet` node port only

- [ ] **Step 1: Change the client candidate port**

Set the Shadowrocket `Sixtynet` port from 8443 to 443 and save. Do not change UUID, SNI, Public Key, Short ID, flow, or transport.

- [ ] **Step 2: Select Sixtynet and run GREEN tests**

```bash
curl -4fsS --max-time 15 https://api.ipify.org
curl -4sS -o /dev/null --max-time 20 \
  -w 'http=%{http_code} total=%{time_total}s\n' https://x.com/
curl -4sS -o /dev/null --max-time 20 \
  -w 'http=%{http_code} total=%{time_total}s\n' https://www.youtube.com/
curl -4sS -o /dev/null --max-time 15 \
  -w 'http=%{http_code} total=%{time_total}s\n' \
  https://www.youtube.com/generate_204
```

Expected GREEN result: exit IP `104.202.107.130`; HTTP codes `200`, `200`, and `204`.

- [ ] **Step 3: Roll back the candidate if GREEN fails**

Restore the Shadowrocket port to 8443, then run:

```bash
ssh sixtynet '
  kill "$(cat /tmp/xray-443-test.pid)" 2>/dev/null || true
  ufw --force delete allow 443/tcp
  rm -f /tmp/xray-443-test.json /tmp/xray-443-test.log \
    /tmp/xray-443-test.pid
'
```

Expected: production remains active on 8443 and the investigation returns to root-cause analysis.

### Task 4: Promote the validated candidate

**Files:**
- Modify remote: `/usr/local/etc/xray/config.json`
- Preserve remote: `/usr/local/etc/xray/config.json.bak-<timestamp>`

- [ ] **Step 1: Stop the candidate and atomically install its config**

```bash
ssh sixtynet '
  kill "$(cat /tmp/xray-443-test.pid)"
  while kill -0 "$(cat /tmp/xray-443-test.pid)" 2>/dev/null; do
    sleep 0.2
  done
  install -o root -g root -m 0644 /tmp/xray-443-test.json \
    /usr/local/etc/xray/config.json
  xray run -test -config /usr/local/etc/xray/config.json
  systemctl restart xray
'
```

Expected: `Configuration OK` and restart exit 0.

- [ ] **Step 2: Verify production before removing 8443**

```bash
ssh sixtynet '
  systemctl is-active --quiet xray
  ss -lntp | grep ":443 "
  ! ss -lntp | grep -q ":8443 "
  journalctl -u xray --since "2 minutes ago" -p 0..3 --no-pager
'
```

Expected: Xray is active only on 443 and no high-priority errors appear.

- [ ] **Step 3: Remove the obsolete firewall rule and temporary files**

```bash
ssh sixtynet '
  ufw --force delete allow 8443/tcp
  rm -f /tmp/xray-443-test.json /tmp/xray-443-test.log \
    /tmp/xray-443-test.pid /tmp/xray-443-backup-id
  ufw status numbered
'
```

Expected: 443 remains allowed and 8443 is absent.

### Task 5: Final verification and client restoration

**Files:**
- No additional files

- [ ] **Step 1: Re-run the complete client test**

With Shadowrocket using `Sixtynet`, repeat the Task 3 GREEN commands.

Expected: exit IP `104.202.107.130`; HTTP `200`, `200`, and `204`.

- [ ] **Step 2: Verify adjacent services**

```bash
ssh sixtynet '
  for service in ssh xray hysteria tailscaled docker; do
    printf "%s=" "$service"
    systemctl is-active "$service"
  done
  systemctl --failed --no-pager
  ss -lntup | grep -E "(:22|:443|:8444)"
'
```

Expected: all listed services are active, no failed units exist, and required ports listen.

- [ ] **Step 3: Restore the user's original selected node**

Select `【直连】Japan-日本-NLX` in Shadowrocket and confirm:

```bash
curl -4fsS --max-time 15 https://api.ipify.org
```

Expected: the previous Japan-node exit IP is restored while the repaired `Sixtynet` configuration remains saved.

### Production rollback

If production Xray fails after promotion:

```bash
ssh sixtynet '
  ts=$(cat /tmp/xray-443-backup-id)
  cp -a "/usr/local/etc/xray/config.json.bak-$ts" \
    /usr/local/etc/xray/config.json
  xray run -test -config /usr/local/etc/xray/config.json
  systemctl restart xray
  ufw allow 8443/tcp
'
```

Then restore the Shadowrocket port to 8443 and remove the temporary 443 rule.
