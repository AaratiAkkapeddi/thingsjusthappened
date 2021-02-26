      var public_spreadsheet_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQB54w_pHd6z8PNNXxe1mEVNOFd2bqG5mhPcfLQXcjj_h2UisWJXqKUfe_ySlHN_1xJOA6i8GD_lU2-/pub?gid=1129457337&single=true&output=csv"
      
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
          let link = document.createElement("a");
          link.href= "project.html?person="+data[i].Name.split(" ").join("-")

          let project = document.createElement("div");
          project.classList.add("project");
          if(data[i]["Thumbnail Image"].length > 0){
            let thumbnail = document.createElement("img");
            let title = document.createElement("h4");
            title.innerHTML = data[i]["Project Title"];
            let name = document.createElement("h4");
            name.innerHTML = data[i]["Name"];
            thumbnail.src = data[i]["Thumbnail Image"]
            console.log(thumbnail.src)
            thumbnail.src = thumbnail.src.split("/open?").join("/uc?")
            project.append(link)
            link.append(thumbnail)
            link.append(title)
            link.append(name)

          }
          
          // p.innerHTML = data[i].text
          console.log(data[i]["Images"])
          document.getElementById("data-area").append(project);
        }


      }

