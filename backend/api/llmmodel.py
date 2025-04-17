from youtube_transcript_api import YouTubeTranscriptApi
from pytubefix import YouTube 
import assemblyai as aai
import os
from google import genai

###### Provide Your Gemini Ai API ##########
# genai.configure(api_key="GOOGLE_PALM_API_KEY")


from dotenv import load_dotenv,find_dotenv

load_dotenv(find_dotenv())

client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))
def get_validURL(url):
    try:
        video_id=url.split("?v=")[1]
        return [video_id,None]
    except:
        return [None,f"Invalid Link '{url}'"]

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
        ys = yt.streams.get_audio_only()
        try:
            #################  Provide the ASSEMBLY AI API KEY ####################
            aai.settings.api_key = os.environ.get("AAI_API_KEY")
            transcriber = aai.Transcriber()
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
    # model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
        Generate the title for the given content.
        Content: {content}.
        give only one title name.
    """
    response = client.models.generate_content(
    model="gemini-1.5-flash", contents=prompt)
    # response = model.generate_content(prompt)
    return response.text



def main(content,query):

    # model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""
        Based on the provided content, generate a precise and helpful response to the user's query. 

        - If the answer is found in the content, present it clearly and concisely. 
        - If the answer isn't found , respond based on general knowledge relevant to the query, if possible.
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
    response = client.models.generate_content(
    model="gemini-2.0-flash", contents=prompt)
    # response = model.generate_content(prompt)

    return response.text