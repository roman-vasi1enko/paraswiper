import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function FinalScreen({ videos }) {
    
    const location = useLocation();
    const navigate = useNavigate();

    let totalProcessed = location.state.totalProcessed;
    let action = location.state.action;

    const handleClick = () => navigate('/wizard')

    return (
        <>
            
            <div className="min-h-screen bg-base-200">

                <ul className="steps py-10 flex justify-center bg-base-200">
                    <li className="step w-40">Choose Video</li>
                    <li className="step w-40">Analyze & Review</li>
                    <li className="step w-40 step-secondary">Swipe Spam</li>
                </ul>
                
                <div className="text-center mt-20">
                        <h1 className="text-5xl font-bold italic">💨SWIPED!</h1>
                        <p className="py-6 text-xl mb-4">Successfully {action === 'delete' ? 'deleted' : 'reported'}: {totalProcessed} {totalProcessed > 1 ? 'comments' : 'comment'}</p>
                        <button className="btn btn-primary" onClick={handleClick}>Swipe more</button>
                        {action === 'delete' &&  <a href={`https://youtube.com/watch?v=${videos.items[0].id}`} target="_blank"><button className="btn btn-outline btn-primary ml-6">See on YouTube</button></a>}
                </div>
            </div>
        </>
    )
}

export default  FinalScreen;