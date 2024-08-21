import { useEffect, useState } from "react";
import CategoryComponent from "./CategoryComponent";
import ScrollShowbarComponent from "./ScrollShowbarComponent";
import { Link } from "react-router-dom";
import dummyPic from "../assets/pg1.jpg";



export default function HomeComponent(props) {
  

  const PRECISION = 10 ** 18;
  const [stats, setStats] = useState({
    projects: 0,
    fundings: 0,
    contributors: 0,
  });
  const [featuredRcmd, setFeaturedRcmd] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);
  const getAllProjects = async () => {
    try {
      let res = await props.contract.getAllProjectsDetail().then((res) => {
        let tmp = [];
        let amount = 0,
          contrib = 0;
        for (const index in res) {
          let {
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
          } = { ...res[index] };
          tmp.push({
            amountRaised,
            cid,
            creatorName,
            fundingGoal,
            projectDescription,
            projectName,
            totalContributors,
            index,
          });
          amount += Number(amountRaised / PRECISION);
          contrib += Number(totalContributors);
        }
        setStats({
          projects: tmp.length,
          fundings: amount,
          contributors: contrib,
        });
        return tmp;
      });
      res.sort((a, b) => {
        return b.totalContributors * 1 - a.totalContributors * 1;
      });
      setFeaturedRcmd(res.slice(0, 4));
      setRecentUploads(res.slice(4, 24));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

 
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
    
      <div className="siteStats w-full">
        <div className="tagLine flex justify-center">
        <p className=" text-5xl text-center text-white">
        Creative work shows us what’s possible
          <br />
          <span className="text-4xl mt-5">Help fund it here</span>
      </p>
        </div>
        
        
        <div className="stats flex flex-wrap mt-10 lg:mt-20 justify-evenly">

        <div  className="w-full sm:w-1/2 lg:w-1/4 bg-black px-5 py-4 rounded-lg bg-glow-custom-2">
            <div className="flex flex-col h-full justify-start items-center">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full m-5">
                hi
              </div>
              <div>
                <h5 className="mt-1 text-center m-2 text-5xl text-orange-500">{stats.projects}</h5>
                <p className="text-md p-2 text-2xl text-white">
                  Registered Artists
                </p>
              </div>
            </div>
          </div>

          <div  className="w-full sm:w-1/2 lg:w-1/4 bg-black px-5 py-4 rounded-lg bg-glow-custom-2">
            <div className="flex flex-col h-full justify-start items-center">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full m-5">
                hi
              </div>
              <div>
                <h5 className="flex flex-col mt-1 text-center m-2 text-3xl text-neutral-500"><span className="text-5xl text-orange-500">{stats.fundings}</span>LineaETH</h5>
                <p className="text-md p-2 text-xl text-white">
                towards creative work
                </p>
              </div>
            </div>
          </div>

          <div  className="w-full sm:w-1/2 lg:w-1/4 bg-black px-5 py-4 rounded-lg bg-glow-custom-2">
            <div className="flex flex-col h-full justify-start items-center">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full m-5">
                hi
              </div>
              <div>
                <h5 className="mt-1 text-orange-500 text-center m-2 text-5xl">{stats.contributors}</h5>
                <p className="text-md p-2 text-2xl text-white">
                Backings
                </p>
              </div>
            </div>
          </div>

        
        </div>
        
      </div>


      
    </>
  );
}


