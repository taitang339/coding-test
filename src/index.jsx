import React, {  useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css";
 
function HousingInfoView (props){

    //set error values 
    const [error, setError] = useState(null);
    //check if loaded
    const [isloaded, setIsLoaded] = useState(false);
    //set data if loaded 
    const [data, setData] = useState({ communities:null, homes: null});


    useEffect( () => {

        const fetchData = async () => {
            const respCommunities = await axios.get("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities");
            const respHomes = await axios.get("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes");

            setData({
                communities: respCommunities.data,
                homes: respHomes.data
            })
        }

        fetchData().catch( (error) => {
            alert("ERROR");
        });
    }, [])

    console.log(data);

    function infoTable(){

        if(data.communities){
            const communityList = data.communities.map((community)=> 
            <div class="col">
                <div class="card text-center" style={{width: "18em"}}>
                    <figure>
                        <img class="figure-img img-fluid" src={community.imgUrl} alt="Card image cap"></img>
                    </figure>
                    <div class="card-body">
                        <h5 class="card-title">{community.name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            
            );

            return communityList;
        }

        return null;
    }

    // const communityList = data.communities.map((community)=> 
    //         <li>{community.name}</li>
    // );
   
    return(
        <div class="container">
            <div class="row">
            {infoTable()}
            </div>
        </div>
        //<div>{infoTable()}</div>
        // // <h1>HELLO</h1> */}
    );
   
}

ReactDOM.render(
    <HousingInfoView/>, document.getElementById("root")
);
