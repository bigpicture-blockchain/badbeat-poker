import "./ProgressBar.css";
import fire_mission from "../../images/png/fire_mission.png";

function ProgressBar(props) {
    const width = 60
  return (
     <div className="daily_missions">
         <div className="daily_missions_header">
             <div className="daily_missions_header_text">
             Daily Missions
             <i class="fa fa-info-circle info_header" aria-hidden="true"></i>
            </div>
        </div>
        <div className="daily_missions_content">
            <div className="daily_missions_content_title">
            Play 20 Flops (9/20)
            </div>
        <div className="progress_area"> 
            <div className="progress" >
            <div className="progress-bar"
                role="progressbar"
                style={{ width: `${width}%`, borderRadius: '7px',background: `linear-gradient(270deg, #FAD55E 0%, #F7701F 100%)` }} >
            </div>

        </div>
        <img src={fire_mission} className="fire_mission_image" alt="logo" />
        <div>
            <div className="daily_missions_content_number">10</div>
            <div className="daily_missions_content_fire">FIRE</div>
        </div>
        </div>
        </div>
         
     </div> 
    
  );
}

export default ProgressBar;
