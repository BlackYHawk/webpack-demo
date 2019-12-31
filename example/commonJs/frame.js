

var home = $("home");
var loan = $("loan");
var myInfo = $("myInfo");
var tabBar = $("tabBar");


home.addEventListener('select',function(index){
                      var tabName = getTabName(index);
                      tabBarSelect(tabName)
                    })

loan.addEventListener('select',function(index){
                        var tabName = getTabName(index);
                        tabBarSelect(tabName)
                      })

myInfo.addEventListener('select',function(index){
                        var tabName = getTabName(index);
                        tabBarSelect(tabName)
                    })
                    
function getTabName(index) {
    if(index == 0) return "home";
    if(index == 1) return "loan";
    if(index == 2) return "myInfo";
}

function setTabIndex(index) {
	tabBar.selectIndex(index);  
}

function tabBarSelect(tabName) {
  
    var nav1 = $("nav1");
    var nav2 = $("nav2");
    var nav3 = $("nav3");
    
    
    if(tabName == "home") {
        home.setStyle("background-image", "url(img/horse/ms6.png)");
        loan.setStyle("background-image", "url(img/horse/ms7.png)");
        myInfo.setStyle("background-image", "url(img/horse/ms3.png)");
        home.setStyle('color','#009af8');
        loan.setStyle('color','#666666');
        myInfo.setStyle('color','#666666');
    } else if(tabName == "loan") {
        home.setStyle("background-image", "url(img/horse/ms4.png)");
        loan.setStyle("background-image", "url(img/horse/ms2.png)");
        myInfo.setStyle("background-image", "url(img/horse/ms3.png)");
        home.setStyle('color','#666666');
        loan.setStyle('color','#009af8');
        myInfo.setStyle('color','#666666');
    } else if(tabName == "myInfo") {
        home.setStyle("background-image", "url(img/horse/ms4.png)");
        loan.setStyle("background-image", "url(img/horse/ms7.png)");
        myInfo.setStyle("background-image", "url(img/horse/ms5.png)");
        home.setStyle('color','#666666');
        loan.setStyle('color','#666666');
        myInfo.setStyle('color','#009af8');
    }
}
