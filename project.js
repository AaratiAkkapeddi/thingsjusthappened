      var public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQB54w_pHd6z8PNNXxe1mEVNOFd2bqG5mhPcfLQXcjj_h2UisWJXqKUfe_ySlHN_1xJOA6i8GD_lU2-/pub?gid=1129457337&single=true&output=csv"
       var slug = window.location.href.split('person=')[1];
      function init() {
        Papa.parse(public_spreadsheet_url, {
          download: true,
          header: true,
          complete: showInfo
        })
      }

      window.addEventListener('DOMContentLoaded', init)

      function showInfo(results) {
        var data = results.data
        
    
        for (var i = data.length - 1; i >= 0; i--) {
          let newslug = data[i].Name.split(" ").join("-")
          if(newslug == slug){

            /* Found the correct project */
              /* Project Title & Description */
              document.getElementById("project-title").innerHTML = data[i]["Project Title"];
              document.getElementById("by-line").innerHTML = data[i]["Name"];
              document.getElementById("project-description").innerHTML = data[i]["Project Description"];
  
              /* IMAGES */
              if(data[i]["Images"].length > 0){
                let images = data[i]["Images"].split(",");
                for (var x = images.length - 1; x >= 0; x--) {
                  let img = document.createElement("img");
                  img.src = images[x]
                  img.src = img.src.split("/open?").join("/uc?")
                  document.getElementById("project-images").append(img)
                }
              }

              /* YOUTUBE */
              if(data[i]["Video Link (Youtube)"].length > 0){
                  let videoDiv = document.createElement("div");
                  videoDiv.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+ data[i]["Video Link (Youtube)"].split("watch?v=")[1] + '?controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                  document.getElementById("project-images").append(videoDiv)     
              }
              /* VIMEO */
              if(data[i]["Video Link (Vimeo)"].length > 0){
                  let videoDiv = document.createElement("div");
                  console.log(data[i]["Video Link (Vimeo)"].split(".com/")[1])

                  videoDiv.innerHTML = '<iframe src="https://player.vimeo.com/video/'+ data[i]["Video Link (Vimeo)"].split(".com/")[1] + '" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
                  document.getElementById("project-images").append(videoDiv)     
              }



          }
          
        }


      }

