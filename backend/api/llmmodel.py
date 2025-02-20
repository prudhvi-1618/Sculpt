from youtube_transcript_api import YouTubeTranscriptApi
from pytubefix import YouTube 
from pytubefix.cli import on_progress
import assemblyai as aai

############## Unexcueted Imports ##################
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
################################################


import google.generativeai as genai

###### Provide Your Gemini Ai API ##########
genai.configure(api_key="GOOGLE_PALM_API_KEY")

from dotenv import load_dotenv

load_dotenv()


'''
    The workflow of the Gen AI model using Langchain framework. 
    Due to the unavailability of an OpenAI API key and the lack of integration for the Google Gemini API through Langchain, 
    the code is implemented without execution.

'''

#  When I started working on this project, the LLM model already existed.
#  Due to the change from Google PaLM API to Gemini, I am unable to execute the code.

############################## Starting Point: Code implemented but not yet executed due to API limitations. #####################################################

llm = GoogleGenerativeAI(model="models/text-bison-001", temperature=0.1)

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

def get_validURL(url):
    try:
        video_id=url.split("?v=")[1]
        return [video_id,None]
    except:
        return [None,f"Invalid Link '{url}'"]


def TexttoChunks(content):
    text_splitter=RecursiveCharacterTextSplitter(
        separators=["\n\n","\n","."],
        chunk_size=200,
        chunk_overlap=0
    )
    chunks=text_splitter.split_text(content)

    return chunks

def VectorStore(chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vectorstore = FAISS.from_texts(texts=chunks, embedding=embeddings)

    return vectorstore


############################## Starting Point: Code implemented but not yet executed due to API limitations. #####################################################

def scrapeURL(url):
    
    Validated_url, error = get_validURL(url)

    print("Validated URL :",Validated_url)
    if error:
        return ["","",error]
    text='this is a video transcript which is extract from the youtube url given by user . The video transcipt as follows : \n'
    title = ''
    c=0
    try:
        ### Accessing Transcription of a YouTube Video (Captions) Auto Generated captions cannot be accessed 
        transcript=YouTubeTranscriptApi.get_transcript(Validated_url)
        for i in transcript:
            text+=i['text']
        print("Caption Transcription is completed...")
    except:
        c=1
        print("You Tube Transcription Not found")

    try:
        ## Accessing Audio of the youtube Video
        yt = YouTube(url)
        title = yt.title
        print(title)
        ys = yt.streams.get_audio_only()
        try:
            #################  Provide the ASSEMBLY AI API KEY ####################
            aai.settings.api_key = "ASSEMBLY__AI_API_KEY"
            transcriber = aai.Transcriber()
            print(ys.url)
            ## Using Assembly ai stt ( Speech to Text ) model 
            transcript = transcriber.transcribe(ys.url)
            text += transcript.text
            c=0
            print("Audio Transcription is completed ...")
        except:
            print("Youtube video is not transcripted ")
    except:
            print("Error Occured in youtube Downloader library pytube fix..")
    error = None
    if c==1:
        error = f"Can't fetch the data of url {url}"
    return [title,text,error]


## Model to create a chat name 
def get_chat_name(content):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
        Generate the title for the given content.
        Content: {content}.
        give only one title name.
    """
    response = model.generate_content(prompt)

    return response.text



def main(content,query):

    ############
    chunks = TexttoChunks(content)
    vectorstore = VectorStore(chunks)
    embedding_vector = GoogleGenerativeAIEmbeddings(model="models/embedding-001").embed_query(query)
    docs = vectorstore.similarity_search_by_vector(embedding_vector)
    ############

    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""
        Based on the provided content, generate a precise and helpful response to the user's query. 

        - If the answer is found in the content, present it clearly and concisely. 
        - If the answer isn't in the content, refer to "{docs}" retrieved from vector search embeddings for additional context or insights.
        - If the answer isn't found in both sources, respond based on general knowledge relevant to the query, if possible.
        - If the answer cannot be determined, politely indicate that the information isn't available.


        ***Important Notes:*** 
        - Do not direct the user to read the transcript or watch the video.
        - The answer should be framed as a suggestion, not as a redirection to source material.

        ### Formatting Guidelines:
        - Use HTML tags such as `<h2>`, `<p>`, `<em>`, and others for a well-structured response.
        - Apply Tailwind CSS for styling. For example, use utility classes like `text-xl`, `font-semibold`, `p-4`, etc., for an aesthetically pleasing output.

        ---

        ### Input Data:
        - **User Query**: {query}
        - **Provided Content**: {content}

        ### Output Example:

        <div class=".....">
                [title based on user query]
            
                [Answer based on the provided content]
        
                    [Relevant information from the vector search embeddings, if needed]
                    
                If no information is found, the answer isn't available at this time.

        </div>
    """
    response = model.generate_content(prompt)

    return response.text

    ############## The Exceuted Code Google Palm Older Version #######################

    ''' qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(),
        memory=memory
    )
    prompt_template=PromptTemplate(
        input_variables=['content','query'],
        template="""Read {content} and answer as per the given text to the user given query.
        If the you don't know the answer  then say 'the answer is not found in the above context
          write the question as per the given youtube video contexts.'"""
    )

    chain=LLMChain(prompt=prompt_template,llm=llm)
    try:
        res = qa_chain({"query": query+ ". Please provide the answer in HTML format, using appropriate tags for headings, paragraphs, and emphasis.Use tailwindcss "})
        # res = qa_chain({"query": query+ ". Please provide the answer in Markdown format, including appropriate headings, lists, bold, and italics. and highlight the questions,subheadings e.t.c"})
        result = res['result'] 
        # result['llm_chain'] = llm(result['result'] + "write about this in detail")
        # result['message'] = ""
    except Exception as e:
        # Pass arguments as keyword arguments
        result = chain.run(text=content, question=query)
        # result["qa_chain"] = chain.run(text=content, question=query)
        # result['llm_chain'] = ""
        # result['message'] ="this out of content Due to in sufficiant data..."

        '''
    











