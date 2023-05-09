import React, { useState } from "react";
import Comment from "./Comment";
import Actions from "./Actions";
import Alert from "./Alert";

function Table({ scanResults, videos }) {
    const [checked, setChecked] = useState(new Array(scanResults[0].length).fill(true));

    if (scanResults[0].length) {
        const checkboxes = document.getElementsByName("selectComment");

        const toggleCheckboxes = (event, id) => {
            const headerBox = document.getElementsByName("toggleAll")[0].checked
            const newChecked = checked.map((item) => headerBox);
            setChecked(newChecked);
        }

        const toggleCheckbox = (index) => {
            const newChecked = [...checked];
            newChecked[index] = !newChecked[index];
            setChecked(newChecked);
        }

        const saveSelection = () => {
            // store comment IDs of comments selected for removal
            let selectedIDs = [];
            Array.from(checkboxes).map((box, i) => box.checked ? selectedIDs.push(scanResults[0][i].commentID) : box)
            
            return selectedIDs;
        }

        return (
            <>
                <div className="overflow-x-auto w-4/5 mx-auto mt-8 max-w-4xl">
                <Actions saveSelection={saveSelection} videos={videos} />
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>
                                <label>
                                    <input type="checkbox" defaultChecked="true" className="checkbox checkbox-primary checkbox-sm" onChange={toggleCheckboxes} name="toggleAll" />
                                </label>
                                </th>
                                <th>Author and Comment</th>
                                <th>Match reason</th>
                                <th>Link</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                scanResults[0].map((comment, i) => {
                                    // TODO: combine duplicate comments and count them
                                    // let counter = 1;
                                    // if (comment.authorID === scanResults[0][i-1].authorID && comment.text === scanResults[0][i-1].text) {
                                    //     counter++;
                                    // }
                                    
                                    return <Comment 
                                        key={comment.commentID} 
                                        comment={comment} 
                                        toggleCheckbox={toggleCheckbox} 
                                        index={i} 
                                        checked={checked[i]} />
                                })
                            }
                        </tbody>
                        
                    </table>
                </div>
            </>
        )
    }
    else {
        return <Alert type='success' />;
    }
}

export default Table;