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
            console.log(error);
        });
    }, [])

    console.log(data);

    function infoTable(){

        let communityList;
        let homeList;
        let totalPrice = 0;
        let averagePrice = 0;
        let communityHomes;

        if(data.communities && data.homes){
            communityList = data.communities.sort((a, b) => a.name.localeCompare(b.name));
            homeList = data.homes;
          
            
        
            communityList = data.communities.map((community)=> {
                communityHomes = homeList.filter((home)=> home.communityId === community.id);
                if(communityHomes.length){
                    totalPrice = communityHomes.reduce((acc, current)=>{
                        return acc + current.price; 
                    }, 0) / communityHomes.length;
                }
                return (
                    <div class="col">
                        <div class="card text-center" style={{width: "18em"}}>
                            <figure>
                                <img class="figure-img img-fluid" src={community.imgUrl.length? community.imgUrl : "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"} alt="Card image cap"></img>
                            </figure>
                            <div class="card-body">
                                <h5 class="card-title">{community.name}</h5>
                                <p class="card-text">Average Price : {totalPrice}</p>
                            </div>
                        </div>
                    </div>
                );
            });
            
            return communityList;
        }

        return null;
    }
   
    return(
        <div class="container">
            <div class="row">
                {infoTable()}
            </div>
        </div>
    );
   
}

ReactDOM.render(
    <HousingInfoView/>, document.getElementById("root")
);
