function Comment({ comment, toggleCheckbox, index, checked }) {

    return (
        <>
            <tr>
                <th>
                    <label>
                        <input type="checkbox" className="checkbox checkbox-sm" name="selectComment" checked={checked} onChange={() => toggleCheckbox(index)} />
                    </label>
                </th>

                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar self-start">
                            <div className="mask mask-circle w-12 h-12">
                                <figure><img src={comment.authorProfilePic} alt="Channel Picture" /></figure>
                            </div>
                        </div>
                        <div>
                        <div className="font-bold">{comment.authorName}</div>
                        <div className="text-sm opacity-90 whitespace-normal w-40 lg:w-64">{comment.text}</div>
                        </div>
                    </div>
                </td>

                <td>
                    {/* [x1]
                    <br/> */}
                    <span className="badge badge-error badge-md">{comment.matchReason}</span>
                </td>

                <th>
                    <a className="btn btn-ghost btn-xs" href={`https://www.youtube.com/watch?v=${comment.videoID}&lc=${comment.commentID}`} target='_blank'>details</a>
                </th>
            </tr>
        </>
    )
}

export default Comment;