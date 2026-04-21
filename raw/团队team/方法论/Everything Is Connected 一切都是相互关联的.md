---
ingested: 2026-04-17
wiki_page: "[[知识图谱]]"
title: "Everything Is Connected 一切都是相互关联的"
source: "https://x.com/techwith_ram/status/2042933925832724538"
author:
  - "[[@techwith_ram]]"
published: 2026-04-11
created: 2026-04-15
---
![[524e41c7a9a37584832faeb2e27d2700_MD5.jpg]]

I think the title is a bit philosophical. Isn't it?我觉得标题有点哲学化。不是吗？

Don't worry, you will get it at the end. So, imagine a scene: you are standing in a bookshop. You pick up a novel. On the cover it says the author's name. You happen to know that author also teaches at a university in your city. That university is located near a park where there is a statue of a poet who was a contemporary of a character in the very novel you are holding.别担心，你最终会得到的。想象一个场景：你站在一家书店里。你拿起一本小说。封面上写着作者的名字。你知道那位作者也在你所在城市的一所大学任教。那所大学靠近一个公园，那里有一座诗人的雕像，而这位诗人是你手中小说中角色的同时代人。

You made five connections in a few seconds, entirely without effort. This is how human knowledge actually works. It does not live in isolated boxes. It is a dense, tangled network of associations, and our brains are extraordinarily good at navigating it.你几秒钟内轻松完成了五次连接。这就是人类知识的实际运作方式。它不生活在孤立的盒子里。它是一个密集、错综复杂的联想网络，而我们的大脑在导航方面异常擅长。

The question is, **how do we teach a computer to do the same thing?**问题是， **我们如何教会计算机做同样的事情？**

# Why do traditional databases fall short?为什么传统数据库会有所不足？

Traditional relational databases organize information into tables: rows and columns. A library database might have a Books table, an Authors table, and a Publishers table. To connect them, you write a JOIN query; you tell the system, "Match the author\_id in Books with the id in Authors."传统的关系型数据库将信息组织为表：行和列。图书馆数据库可能有图书表、作者表和出版商表。要连接它们，你写一个 JOIN 查询;你告诉系统：“将书籍中的 author\_id 与作者中的 ID 匹配。”

This works wonderfully for a fixed, predictable set of relationships. But it breaks down when:这对固定且可预测的关系组合非常有效。但它在以下情况下就显现出来了：

- **Relationships vary per entity:** A book has an author. But a scientific paper has co-authors, an institution, a funding body, and a dataset. These cannot all live comfortably in the same table structure.**关系因实体而异：** 一本书有作者。但科学论文有合著者、机构、资助机构和数据集。这些组合不可能都舒适地存在于同一个桌子结构中。
- **The schema changes constantly:** In a traditional database, adding a new type of relationship often requires restructuring the entire schema. In a graph, you simply add a new edge type.**模式不断变化：** 在传统数据库中，添加一种新的关系类型通常需要重构整个模式。在图中，你只需添加一种新的边类型。
- **Traversing many hops is expensive:** Finding "all books written by authors who studied under professors who won the same prize" requires multiple nested joins. In a graph, this is a natural path traversal.**穿越许多跳跃成本高昂：** 要找到“所有由曾师从同一获奖教授的作者所写的书籍”需要多个嵌套连接。在图中，这是一种自然路径遍历。

## What is a knowledge graph?什么是知识图谱？

It is a structured representation of real-world entities & the relationships between them, stored as a network (or graph) rather than a table. 它是对现实世界实体及其关系的结构化表示，存储为网络（或图）而非表格。

It consists of:其成员包括：

- **Nodes (also called vertices or entities)** These represent things: a person, a city, a concept, a product, a chemical compound. Each node has a unique identity.**节点（也称为顶点或实体）** 代表事物：一个人、一个城市、一个概念、一个产品、一种化合物。每个节点都有唯一的身份。
- **Edges (also called relationships or predicates)** These connect two nodes and describe the nature of their connection. Edges are always directed and always labeled. "Marie Curie BORN\_IN Warsaw" is a different fact from "Warsaw BORN\_IN Marie Curie"—direction matters.**边（也称为关系或谓词）：** 这些连接两个节点，描述它们连接的性质。边缘总是有方向且有标记。《居里夫人 BORN\_IN 华沙》与《华沙 BORN\_IN 玛丽居里》是不同的事实——导演很重要。
- **Properties (also called attributes or literals)** Both nodes and edges can carry additional data: a person node might have a birth year property; a "WORKED\_AT" edge might carry a start and end date.**属性（也称为属性或文字）** 节点和边都可以携带额外数据：人物节点可能有出生年份属性;“WORKED\_AT”边可能带有起始日期和结束日期。

![[13d4e01da76f8a4dfd8e90402d237dd5_MD5.jpg]]

Designed by author: [@techwith\_ram](https://x.com/@techwith_ram)

## The triple: the smallest unit of knowledge

The fundamental building block of a knowledge graph is the **triple**: a statement made of three parts.

![[1ea9d1191ebb4450ec50c6f607d2f550_MD5.jpg]]

Designed by author: [@techwith](https://x.com/@techwith).ram

Three sentences. Eleven words. And from them, a machine can already infer that Marie Curie was born in the capital of a European country. That kind of chained reasoning is the superpower of the knowledge graph.

## Building a Knowledge Graph

A real-world example: a city neighbourhood

Let us build a small knowledge graph together. Imagine we want to represent the knowledge contained in this single paragraph:

> The Blue Door is a cafe on Elm Street. It is owned by Ramakrushna, who also owns the bakery next door called Morning Light. The Blue Door is known for its Ethiopian coffee, which is sourced from the Yirgacheffe region. Morning Light supplies pastries to three local hotels, including the Grand Elm.

![[ac6062eda8f703e106d2256343e2e3dd_MD5.jpg]]

Designed by Author: [@techwith\_ram](https://x.com/@techwith_ram)

Notice something important: once this graph exists, questions that were never explicitly answered in the original text become answerable. For example: "Is Ramakrushna connected to the Grand Elm Hotel?" The text never says so directly, but the graph reveals the path: Ramakrushna owns Morning Light, and Morning Light supplies the Grand Elm. Two hops. One answer.

## Ontology: the grammar of your graph

A knowledge graph without an **ontology** is like a library without a cataloguing system. Ontology is the formal description of what kinds of things exist in your domain and what kinds of relationships are possible between them.

Think of it as the rules of the game. An ontology might say, "In our graph, a Person can OWN a Business, but a City cannot." This prevents nonsense from entering your data.

## Classes and instances

In an ontology, we distinguish between **classes** (categories of things) and **instances** (specific things). "Person" is a class. "Marie Curie" is an instance of that class. "City" is a class. "Warsaw" is an instance. This distinction lets us write rules at the class level that apply to every instance automatically.

**Adding context with named graphs:**

Sometimes a single fact is not enough. You need to say when something was true, or according to whom. This is done using **named graphs** essentially, a wrapper around a set of triples that adds provenance and temporal context.

> APJ Abdul Kalam President of India.

... is only valid from 2002 to 2007. The context provides the time range.

Without this temporal layer, your graph would assert things that are no longer true, with no way to distinguish current facts from historical ones.

## Querying the Graph

The real power of a knowledge graph emerges when you query it. Instead of asking, "Give me row 47 from this table," you ask questions that follow chains of relationships. Questions like:

1. "Find all scientists who were born in Europe and won a Nobel Prize in a natural science discipline." This traverses BORN\_IN, LOCATED\_IN, WON, and FIELD\_OF edges in a single query.
2. Which products are manufactured by companies owned by someone who also serves on the board of our company? ". This is a 4-hop traversal that would require multiple joins in SQL but is natural in a graph query language like SPARQL or Cypher.

![[8462e32450ba3bd7687f00386a294f5e_MD5.jpg]]

Designed by author: [@techwith\_ram](https://x.com/@techwith_ram)

Path query: Shakespeare -- \[2 hops\] -- Academy Award

Perhaps the most intellectually satisfying feature of knowledge graphs is **inference**: the ability to derive new facts that were never explicitly stored, purely by applying logical rules to what is already there.

A simple example

Suppose your graph contains these two facts:

**Anna is parent of Ben**

**Ben is parent of Clara**

You have also defined an ontology rule: "If X is parent of Y, and Y is parent of Z, then X is grandparent of Z."

The graph can now be derived without you explicitly adding it:

**Anna is the grandparent of Clara**

Scale this idea to millions of facts and hundreds of rules, and you have a system that can surface knowledge that no human explicitly put there.

I'm someone who works in the healthcare sector; let me give you an example from there:

> A medical knowledge graph might store "Drug A inhibits Enzyme B" and "Enzyme B is required for the synthesis of Protein C, which is overexpressed in Cancer D." From these two facts, inference can automatically suggest that Drug A may be a candidate treatment for Cancer D, even if no researcher has yet made that explicit connection.

## Knowledge Graphs vs Other Data Models

![[7b4b8e0efe8f4bd29f56f7d3ce6dc464_MD5.jpg]]

AI Generated by [@techwith\_ram](https://x.com/@techwith_ram)

# When should you choose a knowledge graph?

KG is not always the right tool. It shines in specific situations. Here is a simple rule: if the relationships between your data are as important as the data itself, consider a knowledge graph.

**Use a knowledge graph when :::** Your data comes from many heterogeneous sources. Your schema evolves frequently. You need to traverse chains of relationships. You want to derive new facts by reasoning over existing ones.

**Stick with a relational database when :::** Your data is highly tabular and stable. Your queries are simple lookups or aggregations. You need transactional guarantees (ACID) above all else. Your team is SQL-proficient, and your data fits the table model cleanly.

So have you heard about Google Knowledge Graph?

# Google Knowledge Graph

The most famous knowledge graph in the world is the one built by Google. Launched in 2012, it powers the information boxes you see on the right side of search results, those cards that tell you who a person is, what they are known for, where they were born, and what other entities are related to them.

When you search for **"Albert Einstein,"** Google does not just find web pages containing that string. It retrieves a structured entity, a node in a graph that carries facts about Einstein and links him to other entities: **his theories**, **his university**, **his colleagues**, **his era.**

**I mean, if you will hear the scale of it, you will be shocked.**

It is estimated to contain tens of billions of facts across hundreds of millions of entities. It underpins not just search results, but also Google Assistant, Google Maps, and an increasing number of AI features.

Some of the most consequential knowledge graphs are invisible to the public. In biomedical research, knowledge graphs are used to integrate data from:

- **Drug databases:** Chemical structures, mechanisms of action, side effects, interactions.
- **Genomic databases:** Gene-disease associations, protein functions, pathways.
- **Clinical literature** Published research on treatment outcomes and case studies.

By connecting these sources in a single graph, researchers can identify unexpected drug repurposing opportunities, predict adverse drug interactions, and understand disease mechanisms that span multiple biological layers.

# How Does an Enterprise Knowledge Graph Work?

![[18e9c5bd83cca3c6fac054b99652df77_MD5.jpg]]

AI Generated by [@techwith\_ram](https://x.com/@techwith_ram)

# Final Thought

Knowledge graphs are powerful, but they are not magic. Understanding their limitations is as important as understanding their strengths.

No knowledge graph is complete. Wikidata, one of the largest public knowledge graphs, has millions of entities but enormous gaps; most people, places, and events in history are not represented or are represented incompletely.

More dangerously, knowledge graphs can contain **incorrect facts**. If the data source was wrong, or if the extraction process misread a piece of text, the graph will confidently assert something false. And because inference can propagate that error through the graph, one bad fact can corrupt many derived conclusions.

Hope you like the article; comment on what you feel or if you want to share something.

Follow [@techwith\_ram](https://x.com/@techwith_ram) for more such posts.