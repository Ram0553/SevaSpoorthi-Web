import { child, get, limitToLast, onValue, query, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { fireDb } from "../../Config/Firebase";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import "./News.css";
import TextEditor from "../TextEditor/TextEditor";

function News(){
    const [latest, setlatest] = useState([]);
    const [archive, setarchive] = useState([]);
    var allNews=[];
    // const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const navigate = useNavigate();

    function fetchNews(){
        const recentPostsRef = query(ref(fireDb, "News"),limitToLast(200000));
        onValue(recentPostsRef,(snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((news)=>{
                    var images=[]
                    news.child("images").forEach((img)=>{
                        images.push(img.val());
                    });
                    var newsObj = {
                        "heading":news.child("heading").val(),
                        "content":news.child("content").val(),
                        "link":news.child("link").val(),
                        "date":news.child("date").val(),
                        "images":images
                    }
                    allNews.push(newsObj);
                });
                allNews.reverse();
                console.log(allNews);
                var latestNews=[],archiveNews=[];
                for(var i in allNews){
                    console.log(allNews[i]["heading"]);
                    if(i<5){
                        latestNews.push(allNews[i]);
                    }
                    else{
                        archiveNews.push(allNews[i]);
                    }
                }
                setarchive(archiveNews);
                setlatest(latestNews);
            }
        });
        return;
    }

    function handleClick(event){
        switch(event.target.getAttribute("name")){
            case "latest":
                navigate('/NewsDetails',{state:{news:latest[event.target.getAttribute("data-key")]}});
                break;
            case "archive":
                navigate('/NewsDetails',{state:{news:archive[event.target.getAttribute("data-key")]}});
                break;
        }
    }

    useEffect(() => {
      fetchNews();
    },[]);
    
    return (
        <div className="news">
            <h1>News Section</h1>  
            {/* <TextEditor editorState={editorState} setEditorState={setEditorState}/>           */}
            <div className="news-block">
                <div className="news-latest">
                    <h3>Latest</h3>
                    <div className="scroll-news-block">
                    <div className='news-div'>
                            {latest.map((news, index) => {
                                return <p key={index} name="latest" data-key={index} onClick={handleClick}>{news["heading"]}<br/>{`Uploaded on : ${news["date"]}`}</p>;
                            })}
                        </div>
                    </div>
                </div>
                <div className="line"/>
                <div className="news-archive">
                    <h3>Archive</h3>
                    <div className="scroll-news-block">
                        <div className='news-div'>
                            {archive.map((news, index) => {
                                return (
                                    <div>
                                        <p key={index} name="archive" data-key={index} onClick={handleClick}>{news["heading"]}<br/>{`Uploaded on : ${news["date"]}`}</p>
                                    </div>
                                )  
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default News;