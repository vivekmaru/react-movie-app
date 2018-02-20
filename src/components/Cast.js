import React from "react";
import { browserHistory, Link } from "react-router";
const Cast = props => {
  return (
    <li className="cast-item">
      <Link>
        <img
          className="avatar"
          src={
            "https://image.tmdb.org/t/p/w132_and_h132_bestv2" +
            (props.cast.profile_path || "/AdoSOsacA5MquZruWeBZVgQ7fSm.jpg")
          }
          alt="no"
        />

        <div className="casttitle">
          <p className="castname">{props.cast.name}</p>
          <p className="castcharacter">{props.cast.character}</p>
        </div>
      </Link>
    </li>
  );
};

export default Cast;
