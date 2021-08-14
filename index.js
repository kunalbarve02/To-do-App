var listPop,defmsg,tdcont,tdarray=[],tditems=[],todo,defmsgcount,defmsgpop,card,tdhead,tdheadcont,tdlist,addItBtn,btnCont,remBtn,horz,i=0;
var remBtnclass,popIn,itemHead,itemPo,currentCard,currentList,largeViewNav,hr,lgcard,back,mark,markbtn;
listPop=$("#popupList");
tdcont=$(".todo-container");
tdcont.addClass("List-Container")
defmsg=$(".defmsg");
defmsgcount=0;
defmsgpop=$("<div></div>");
tdhd=$("#card-input");
btnCont=$("<div></div>");
remBtn=$("<button></button>").text("🗑️");
addItBtn=$("<button></button>").text("+");
itemPo=$("#popupItem");
popIn=$("#item-input")
largeViewNav=$(".Large-view-nav");
largeViewNav.attr("onclick","normalView()")
headContainer=$(".Header-Container");
hr=$(".hr");
back=$("#Heading-List")
function listAdd() {                                        // to show popup of adding lists
    listPop.css("display","block"); 
}
function def() {
    var defmsgpopcontent;                                   //to print default message
    defmsgpop.addClass("defmsg")
    defmsgpopcontent=$("<h3></h3>").text("create a to-do list !")
    defmsgpopcontent.addClass("defmsg-content")
    tdcont.append(defmsgpop)
    defmsgpop.append(defmsgpopcontent)
}
function listCancel() {                                      //when adding a list is cancelled
    defmsgcount++;
    console.log(defmsgcount);
    listPop.css("display","none");
    listPop.css("transition","0.2s");
    if (defmsgcount==1) {
        def();
    }    
}
function listObj(tdcard,tdhdcontainer,tdtitle,hz,tditlist,buttonContainer,addItem,remCard,itArr)
{
    this.tdcard=tdcard;
    this.tdhdcontainer=tdhdcontainer;
    this.tdtitle=tdtitle;
    this.hz=hz;
    this.tditlist=tditlist;
    this.buttonContainer=buttonContainer;
    this.addItem=addItem;
    this.remCard=remCard;
    this.itArr=itArr;
}
function createList() {                                        //to create list
    if (tdhd.val()!=null&&tdhd.val()!="")
    {
        defmsgpop.remove();
        card=$("<div></div>");
        card.addClass("List");
        listPop.css("display","none");
        tdcont.append(card);
        tdheadcont=$("<div></div>");
        card.append(tdheadcont)
        tdhead=$("<h3></h3>").text(tdhd.val());
        tdhead.addClass("List-Heading");
        tdhead.attr("onclick","largeView(this)");
        tdheadcont.append(tdhead);
        horz=$("<hr>");
        horz.addClass("Horizontal-Line")
        card.append(horz);
        tdlist=$("<ul></ul>");
        tdlist.addClass("itCont");
        card.append(tdlist);
        btnCont=$("<div></div>");
        btnCont.addClass("footer")
        card.append(btnCont);
        addItBtn=$("<button></button>").text("+");
        addItBtn.addClass("add-item")
        addItBtn.attr("onclick","itemPop(this)");
        btnCont.append(addItBtn);
        remBtn=$("<button></button>").text("🗑️");
        remBtn.addClass("del-list")
        remBtn.attr("onclick","delList(this)");
        btnCont.append(remBtn); 
        tdarray.push(new listObj(card,tdheadcont,tdhead,horz,tdlist,btnCont,addItBtn,remBtn,tditems));
    }
    else 
    {
        alert("Add Title to the list!!");
    }
    
}

    
function itemPop(element) {                                         //to show popup of adding item
    currentList = element;
    itemPo.css("display","block");
    
}
function createItem() {                                             //to create item
    if(popIn.val()!=null && popIn.val()!="")
    {currentList=currentList.parentNode.parentNode.childNodes[2];
    console.log(currentList);
    itemHead=$("<li></li>").text(popIn.val());
    itemHead.addClass("listItem");
    tdlist.append(itemHead);
    markDone=$("<button class='mark-done-btn'>Mark Done</button>")
    markDone.attr("onclick","markItem(this)");
    tditems.push(itemHead);
    tdlist.append(markDone)
    tdarray.map(item=>{
        console.log(item);
        console.log(item.tditlist[0]);
        if (currentList==item.tditlist[0]) {
            item.tditlist.append(itemHead);
        }
    })
    itemPo.css("display","none");
    }
    else 
    {
        alert("Add name to the item")
    }
}
function itemCancel()                                                //when adding an item is cancelled
{
    itemPo.css("display","none");
}
function delList(element) {                                          //to delete list
   var c = element.parentNode.parentNode;
   console.log(c);
   tdarray.map(item=>{
       console.log(item.tdcard)
       if(c==item.tdcard)
       {
           console.log(true)
           tdarray.pop(item);
       }
   })
   c.remove()  ;
   i--;
}
function largeView(element)                                           //to display the larger view
{
    lgcard=element.parentNode.parentNode;
    tdarray.map(lg=>{
        console.log(lgcard);
        console.log(lg.tdcard);
        if (lgcard==lg.tdcard[0]) {
            console.log(lg.tdcard[0]);
            lgcard.classList.remove("List");
            lgcard.classList.add("Large-view");
            headContainer.css("display","none");
            hr.css("display","none");
            largeViewNav.css("display","block");
            console.log(true);
            if($(window).width()>=360 && $(window).width()<480)         //mobile View
            {
                lgcard.classList.remove("List");
                lgcard.classList.add("Large-view");
                console.log(true);
                lg.hz[0].style.display="block";
                lg.tditlist[0].style.display="block";
                lg.buttonContainer[0].style.display="block";
            }
        }
        else 
        {
            lg.tdcard[0].style.display="none";
            console.log(false);
        }
    })

        
}

function normalView() {                                                 //to display the normal view
    headContainer.css("display","block");
    hr.css("display","block");
    largeViewNav.css("display","none");
    tdarray.map(lg=>{
        if (lgcard==lg.tdcard[0]) {
            lgcard.classList.add("List");
            lgcard.classList.remove("Large-view"); 
            if($(window).width()>=360 && $(window).width()<480)         //mobile View
            {
                console.log(true);
                lg.hz[0].style.display="none";
                lg.tditlist[0].style.display="none";
                lg.buttonContainer[0].style.display="none";
            }   
        }
        else 
        {       
            lg.tdcard[0].style.display="inline-block";
        }
    })
}
function markItem(element)
{
    element=element.nextSibling
    tdarray.map(list=>{
        list.itArr.map(mkit=>{
            if(element==mkit[0])
            {
                element.style.color="#ff6d3f"
                element.style.textDecorationLine= "line-through";
                element.style.textDecorationColor= "#ff6d3f";
                element.style.textDecorationStyle= "solid";
            }
        })
    })
if (tdarray.length === 0)
{
    def();
}
else
    defmsgpop.remove()
}