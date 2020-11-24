import React, {  useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css";
 
function HousingInfoView (props){

    //intialize state
    const [data, setData] = useState({ communities:null, homes: null});


    useEffect( () => {

        //using axios and async function to get both request 
        const fetchData = async () => {
            const respCommunities = await axios.get("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities");
            const respHomes = await axios.get("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes");

            //set the response data
            setData({
                communities: respCommunities.data,
                homes: respHomes.data
            })
        }

        //handle errors 
        fetchData().catch( (error) => {
            //Alert error for now
            alert("ERROR");
            console.log(error);
        });
    }, [])

    function infoTable(){

        let communityList;
        let homeList;
        let totalPrice = 0;
        let communityHomes;

        if(data.communities && data.homes){

            communityList = data.communities.sort((a, b) => a.name.localeCompare(b.name));
            homeList = data.homes;

            communityList = data.communities.map((community)=> {

                //filter homes for each community in the list
                communityHomes = homeList.filter((home)=> home.communityId === community.id);

                //check if community does exist in the home list
                if(communityHomes.length){
                    //use reduce to find total price of homes
                    totalPrice = communityHomes.reduce((acc, current)=>{
                        return acc + current.price; 
                    }, 0);
                }else{
                    totalPrice = 0;
                }
                return (
                    <div class="col">
                        <div class="card text-center" style={{width: "18em"}}>
                            <figure>
                                <img class="figure-img img-fluid" src={community.imgUrl.length? community.imgUrl : "https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"} alt="Card image cap"></img>
                            </figure>
                            <div class="card-body">
                                <h5 class="card-title">{community.name}</h5>
                                <p class="card-text">Average Price : {new Intl.NumberFormat().format((totalPrice/communityHomes.length || 0))}</p>
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
