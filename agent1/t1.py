# pip install llama-index-llms-huggingface
# pip install llama-index-llms-huggingface-api
# pip install "transformers[torch]" "huggingface_hub[inference]"
# pip install llama-index


from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI

llm = HuggingFaceInferenceAPI(
    model_name="Qwen/Qwen2.5-Coder-32B-Instruct",
    temperature=0.7,
    max_tokens=50,
    # stop_sequences=["\n\n"],
    token="-",
)

a=llm.complete("Hello, how are you?")
print(a.text)
# I am good, how can I help you today?