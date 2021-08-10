import React from 'react';
import './Definition.css';

const Definition = ({word, category, meaning}) => {
    return (
        <div className="meanings">

            {
                meaning[0] && word && category ==="en" && (
                    <audio src={meaning[0].phonetic[0] && meaning[0].phonetic[0].audio}
                        style={{backgroundColor: "#fff", borderRadius: 10}}
                        controls>
                        browser does not support audio
                    </audio>
                )
            }

            {word === "" ? (
                <span className="subTitle">searching the word</span>
            ):(
                meaning.map((mean) => mean.meaning.map((item) => 
                item.definition.map((def) => (
                    <div className="singleMeN" 
                        style={{backgroundColor: "white", color: "black"}}
                    >
                        <b>{def.definition}</b>
                            <hr style={{backgroundColor:"black", width:"100%"}}/>
                            {
                                def.example && (
                                    <span>
                                        <b>Example:</b>
                                        {def.example}
                                    </span>
                                )}
                                <span> 
                                    <b>synonyms :</b>
                                    {def.synonyms.map((s) => `${s}, `)}
                                </span>
                    </div>
                ))
            )
        )
    )}
        </div>
    )
}

export default Definition;
