# AI API 集成说明

## 概述

本项目使用 Vercel AI SDK 集成了 OpenAI 兼容的 AI API（通过 OpenRouter）。

## 配置

1. 在 `.env.local` 文件中配置你的 API 密钥：
```bash
API_URL=https://openrouter.ai/api/v1
API_KEY=your-openrouter-api-key
```

## API 接口

### 1. 普通聊天接口
- **URL**: `POST /api/ai/chat`
- **功能**: 发送消息给 AI 并获得完整回复

**请求体示例**:
```json
{
  "prompt": "What is the meaning of life?",
  "model": "openai/gpt-oss-20b:free",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**或者使用消息格式**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What is the meaning of life?"
    }
  ],
  "model": "openai/gpt-oss-20b:free"
}
```

### 2. 流式聊天接口
- **URL**: `POST /api/ai/stream`
- **功能**: 发送消息给 AI 并获得实时流式回复

**请求体格式与普通接口相同**

## 支持的模型

- `openai/gpt-oss-20b:free` - GPT OSS 20B (免费)
- `openai/gpt-oss-120b:free` - GPT OSS 120B (免费)
- `openai/gpt-3.5-turbo` - GPT-3.5 Turbo
- `openai/gpt-4` - GPT-4

## 测试页面

访问 `/ai` 页面可以测试 AI API 功能，支持：
- 选择不同的模型
- 普通响应和流式响应
- 实时查看 Token 使用情况

## 使用 curl 测试

```bash
# 测试普通响应
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Hello, how are you?",
    "model": "openai/gpt-oss-20b:free"
  }'

# 测试流式响应
curl -X POST http://localhost:3000/api/ai/stream \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a short story",
    "model": "openai/gpt-oss-20b:free"
  }'
```

## 优势

使用 Vercel AI SDK 的优势：
1. **类型安全**: 完整的 TypeScript 支持
2. **统一接口**: 支持多种 AI 提供商
3. **流式支持**: 内置流式响应支持
4. **错误处理**: 更好的错误处理和重试机制
5. **性能优化**: 内置缓存和优化
