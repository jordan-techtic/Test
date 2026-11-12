# N8n

## Assumptions

- **JAW-9925 (Send to OpenAI note):** Keyword routing rules are documented with the node's `notes` and `notesInFlow: true`, not a separate sticky note on that node.
- **JAW-9925 (keyword rules):** Only non-empty `message.text` reaches OpenAI; `/start` uses a fixed greeting; non-text updates are ignored. No allow/deny keyword list or duplicate message-id handling in this workflow.

