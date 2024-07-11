


let result = document.getElementById("result");
let pre_t1 = document.createElement("pre");
let pre_t2 = document.createElement("pre");
let p = document.createElement("p");

function PerformAction(value) {
   try {
      /* set var start */
      let t1 = JSON.parse(localStorage.getItem("t1")) || {};
      let t2 = JSON.parse(localStorage.getItem("t2")) || {};

      if (t1["run_t1"] == undefined) {
         t1["run_t1"] = 0;
      }
      if (t1["ball_t1"] == undefined) {
         t1["ball_t1"] = 0;
      }
      if (t1["wicket_t1"] == undefined) {
         t1["wicket_t1"] = 0;
      }
      if (t1["over_t1"] == undefined) {
         t1["over_t1"] = 0;
      }
      if (t1["text_t1"] == undefined) {
         t1["text_t1"] = "";
      }


      if (t2["run_t2"] == undefined) {
         t2["run_t2"] = 0;
      }
      if (t2["ball_t2"] == undefined) {
         t2["ball_t2"] = 0;
      }
      if (t2["wicket_t2"] == undefined) {
         t2["wicket_t2"] = 0;
      }
      if (t2["over_t2"] == undefined) {
         t2["over_t2"] = 0;
      }
      if (t2["text_t2"] == undefined) {
         t2["text_t2"] = "";
      }
      /* set var end */
      let t1_flag = localStorage.getItem("t1_flag");

      /* sanatize the value receive from button*/
      if (t1_flag == "true" || t1_flag == undefined) {
         /* handle team 1 */
         /* handle runs and balls*/
         t1["run_t1"] = isNaN(value) ? t1["run_t1"] : t1["run_t1"] += +value;
         t1["ball_t1"] = isNaN(value) ? t1["ball_t1"] : t1["ball_t1"] += 1;

         if (isNaN(value)) {
            value = value.toLowerCase().trim();
            if (value == "wicket") {

               t1["wicket_t1"] += 1;
               t1["ball_t1"] += 1;

            } else if (value == "wide ball" || value == "no ball") {
               t1["run_t1"] += 1;
            } else {
               t1["ball_t1"] += 1;
            }
         }

         /* calculate over */
         value = value.toLowerCase().trim();

         if ((t1["ball_t1"] % 6 == 0) && (t1["ball_t1"] != 0)) {
            if (value == "wide ball" || value == "no ball") {
               console.log("No ball or wide ball");
               console.log({ "value receive from buttons : ": value });
            } else {
               t1["over_t1"] += 1
            }
         }

         /* calculate text to show in the UI */
         t1["text_t1"] = `Team1 score   ${t1["run_t1"]}/${t1["wicket_t1"]} (${t1["over_t1"]})`;

         /* turn off team 1 */
         if (t1["wicket_t1"] > 9 || t1["over_t1"] >= 4) {
            localStorage.setItem("t1_flag", false);
         }

         /* handle extra balls */
         let extra_ball_t1 = t1["ball_t1"] % 6;
         if (extra_ball_t1) {
            t1["text_t1"] = `Team1 score   ${t1["run_t1"]}/${t1["wicket_t1"]} (${t1["over_t1"]}.${extra_ball_t1})`;
         } else {
            t1["text_t1"] = `Team1 score   ${t1["run_t1"]}/${t1["wicket_t1"]} (${t1["over_t1"]})`;
         }

         /* handle all out */
         if (t1["wicket_t1"] == 10) {
            t1.text_t1 += ` All out`;
         }

         /* handle over completed */
         if (t1["over_t1"] >= 4) {
            t1.text_t1 += " Overs completed";
         }

      } else if((t2["over_t2"]<4) && (t2["wicket_t2"]<10) && (t2["run_t2"] <= t1["run_t1"])) {
         /* handle team_2 */
         /* handle runs and balls*/
         t2["run_t2"] = isNaN(value) ? t2["run_t2"] : t2["run_t2"] += +value;
         t2["ball_t2"] = isNaN(value) ? t2["ball_t2"] : t2["ball_t2"] += 1;

         if (isNaN(value)) {
            console.log("Not a number")
            value = value.toLowerCase().trim();
            if (value == "wicket") {

               t2["wicket_t2"] += 1;
               t2["ball_t2"] += 1;

            } else if (value == "wide ball" || value == "no ball") {
               t2["run_t2"] += 1;
            } else {
               t2["ball_t2"] += 1;
            }
         }
         /* calculate over 2*/
         value = value.toLowerCase().trim();

         if ((t2["ball_t2"] % 6 == 0) && (t2["ball_t2"] != 0)) {
            if (value == "wide ball" || value == "no ball") {
               console.log("No ball or wide ball");
               console.log({ "value receive from buttons : ": value });
            } else {
               t2["over_t2"] += 1
            }
         }

         /* calculate text to show in the UI 2*/
         t2["text_t2"] = `Team2 score   ${t2["run_t2"]}/${t2["wicket_t2"]} (${t2["over_t2"]})`;

         /* handle extra balls */
         let extra_ball_t2 = t2["ball_t2"] % 6;
         if (extra_ball_t2) {
            t2["text_t2"] = `Team2 score   ${t2["run_t2"]}/${t2["wicket_t2"]} (${t2["over_t2"]}.${extra_ball_t2})`;
         } else {
            t2["text_t2"] = `Team2 score   ${t2["run_t2"]}/${t2["wicket_t2"]} (${t2["over_t2"]})`;
         }

         /* handle all out */
         if (t2["wicket_t2"] == 10) {
            t2.text_t2 += ` All out`;
         }

         /* handle over completed */
         if (t2["over_t2"] >= 4) {
            t2.text_t2 += " Overs completed";
         }
         /* handle match completed */
      }



      ShowResult(t1, t2);

      localStorage.setItem("t1", JSON.stringify(t1));
      localStorage.setItem("t2", JSON.stringify(t2));

      console.log(t1);
      console.log(t2);

   }
   catch (err) {
      console.log({ err });
   }
}

/* Show result */
function ShowResult(t1, t2) {

   pre_t1.innerText = t1["text_t1"];
   pre_t2.innerText = t2["text_t2"];
   result.appendChild(pre_t1);
   result.appendChild(pre_t2);
   DeclareResult(t1,t2);
}

function Reset() {
   localStorage.removeItem("t1");
   localStorage.removeItem("t2");
   localStorage.removeItem("t1_flag");
   pre_t1.innerHTML = null;
   pre_t2.innerHTML = null;
   p.innerHTML = null;
   HandleDefault();

}

function DeclareResult(t1,t2){
   let run_t1 = t1.run_t1;
   let over_t1 = t1.over_t1;
   let wicket_t1 = t1.wicket_t1;


   let run_t2 = t2.run_t2;
   let over_t2 = t2.over_t2;
   let wicket_t2 = t2.wicket_t2;


   if(wicket_t2 >=10 || over_t2 >=4 || (run_t2 > run_t1)){
       let result_str = "";
       console.log("true")
       if(run_t1 > run_t2){
         result_str = `Team1 won by ${run_t1-run_t2} runs`;
       }else if(run_t1 < run_t2){
         result_str = `Team2 won by ${10-wicket_t2} wickets`;
       }else{
         result_str = `Match draw`;
       }
       p.innerText = result_str;
       result.appendChild(p);   
   }
}

function HandleDefault(){
   let t1 = JSON.parse(localStorage.getItem("t1")); 
   let t2 = JSON.parse(localStorage.getItem("t2")) || {};
   if (t2["run_t2"] == undefined) {
      t2["run_t2"] = 0;
   }
   if (t2["ball_t2"] == undefined) {
      t2["ball_t2"] = 0;
   }
   if (t2["wicket_t2"] == undefined) {
      t2["wicket_t2"] = 0;
   }
   if (t2["over_t2"] == undefined) {
      t2["over_t2"] = 0;
   }
   if (t2["text_t2"] == undefined) {
      t2["text_t2"] = "";
   }

   if(t1){
      ShowResult(t1,t2);
   }else{
      pre_t1.innerText = "Match is not started yet";
      result.appendChild(pre_t1);
   }
}
HandleDefault();