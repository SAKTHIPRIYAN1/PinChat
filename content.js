let HistoryWithParent={};

function PinAlreadySavedChat(){
    let PinnedChats = JSON.parse(localStorage.getItem("pinnedChats")) || [];
    console.log("Already Pinned Chats Are:", PinnedChats);

    let savedLinks = PinnedChats.map(chat => chat.link);
    console.log("saved Linnks:",savedLinks);


    const sidebar = document.querySelector('div[class^="group/sidebar"]');
    if (sidebar) {
        console.log("chat Bar Found...",sidebar);
        const AllHistoryItems = sidebar.querySelectorAll('[data-testid^="history-item"]');
        if(AllHistoryItems.length<=0){
            return false;
        }

        // console.log("AllHistory:",AllHistoryItems);
        AllHistoryItems.forEach(chatItem => {
            const chatLink = chatItem.querySelector("a")?.href;

            console.log(chatLink,savedLinks.includes(chatLink));
            if (savedLinks.includes(chatLink)) {
                
                HistoryWithParent[chatLink]=chatItem.parentElement;

                console.log("hey:",chatLink);
                document.querySelector('.PinDivList')?.appendChild(chatItem);
                console.log("Removed pinned chat:", chatLink);
            }
        });

        return true;
    }

    return false;
};


const PinIc=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="16" width="16" style="fill:white;" class="pin right-[1px] fill-slate-500 "  ><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3L32 352c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 384l64 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96z"/></svg>`;
const UnpinIc=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"  height="16" width="16" style="fill:white;" class="pin right-[1px] fill-slate-500"  ><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L481.4 352c9.8-.4 18.9-5.3 24.6-13.3c6-8.3 7.7-19.1 4.4-28.8l-1-3c-13.8-41.5-42.8-74.8-79.5-94.7L418.5 64 448 64c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l29.5 0-6.1 79.5L38.8 5.1zM324.9 352L177.1 235.6c-20.9 18.9-37.2 43.3-46.5 71.3l-1 3c-3.3 9.8-1.6 20.5 4.4 28.8s15.7 13.3 26 13.3l164.9 0zM288 384l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96-64 0z"/></svg>`;
const PinDiv=`<div role="menuitem" id="MyPinButton" class="flex items-center mx-1.5 my-1.5 -mt-1.5   p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3" data-testid="share-chat-menu-item" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><div class="flex items-center justify-center text-token-text-secondary h-5 w-5">${PinIc}</div>Pin</div>`
const UnPinDiv=`<div role="menuitem" id="MyPinButton" class="flex items-center mx-1.5 my-1.5 -mt-1.5   p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3" data-testid="share-chat-menu-item" tabindex="-1" data-orientation="vertical" data-radix-collection-item=""><div class="flex items-center justify-center text-token-text-secondary h-5 w-5">${UnpinIc}</div>UnPin</div>`


// PinDiv Container Styling and Actual Component...
const PinTitle=`<div class="sticky top-0 z-20 bg-token-sidebar-surface-primary"><span class="flex h-9 items-center"><h3 class="px-2 text-sm font-semibold text-ellipsis overflow-hidden break-all pt-3 pb-2 text-token-text-primary">Pinned Chats</h3></span></div>`









const Sideobserver = new MutationObserver((mutationsList, obs) => {
    const sidebar = document.querySelector('div[class^="group/sidebar"]');
    console.log("ll");
    if (sidebar) {
        console.log("Sidebar detected:", sidebar);

        if (!sidebar.querySelector(".PinDiv")) {

            // creating the Pin components..
            const PinDiv = document.createElement("div");
            PinDiv.classList.add("relative", "mt-5", "first:mt-0", "last:mb-5", "PinDiv");
            PinDiv.innerHTML=PinTitle;
            const Olelement=document.createElement("ol");
            Olelement.classList.add("PinDivList");
            PinDiv.appendChild(Olelement);

            // Insert at 2nd position
            if (sidebar.children.length >= 2) {
                sidebar.insertBefore(PinDiv, sidebar.children[2]);
            } else {
                sidebar.appendChild(PinDiv);
            }

            console.log("Pinned Chats section added.");
            // Pinning the Already Saved Chats .....
        }

        let Pinned= PinAlreadySavedChat();
        console.log(Pinned);

            // Disconnect the Mutation Observer...
            if(Pinned){
                console.log("Pinned");
                obs.disconnect();
            }
    }
});



// Start observing only if necessary
const sidebarParent = document.querySelector('div[class^="group/sidebar"]'); // Adjust this
if (sidebarParent) {
    Sideobserver.observe(sidebarParent, { childList: true, subtree: true });
} else {
    Sideobserver.observe(document.body, { childList: true, subtree: true });
};




let isAdded=false;
const handleChatPin=(ChatLink)=>{
    // ChatLink=>obj(link,title);

    // checking the Local Storage...
    if (ChatLink) { 
        let savedLinks = localStorage.getItem("pinnedChats");
    
        if (!savedLinks) {
            localStorage.setItem("pinnedChats", JSON.stringify([ChatLink]));
        } else {
            let savedLinksList = JSON.parse(savedLinks);
            if (!savedLinksList.includes(ChatLink)) {
                savedLinksList.push(ChatLink);
                localStorage.setItem("pinnedChats", JSON.stringify(savedLinksList));
            }
        }
    }
    
    // We Have to Extract the Saved to the Pinned Section...
    const AllHistory=document.querySelectorAll('[data-testid^="history-item"]');
    AllHistory.forEach(history=>{
        if(history.children[0].children[0].href==ChatLink.link){
            // liItems.push(history);
            document.querySelector('.PinDivList')?.appendChild(history);
        }
    });

    console.log("Saved Successfully",ChatLink);
}

const handleUnpin=(ChatLink)=>{
    if(HistoryWithParent[ChatLink.link]){
        const AllHistory=document.querySelectorAll('[data-testid^="history-item"]');
        AllHistory.forEach(history=>{
            if(history.children[0].children[0].href==ChatLink.link){
                HistoryWithParent[ChatLink.link].appendChild(history);
                console.log("Chat Unpinned.");
            }
        });
    }

    // Remove From Local Host...

    let savedLinks = JSON.parse(localStorage.getItem("pinnedChats")) || [];
    savedLinks=savedLinks.filter(lnk=>lnk.link!=ChatLink.link);

    localStorage.setItem("pinnedChats",JSON.stringify(savedLinks));
    console.log(savedLinks);

    
}


const MenuParent=()=>{
        let menu = document.querySelector('[data-testid^="history-item-"][data-testid$="-options"]');
        return menu.parentElement.parentElement;
}

const FindData=(ChatDiv)=>{
    console.log(ChatDiv);
    const Link=ChatDiv?.querySelector("a")?.href;
    const Title=ChatDiv?.querySelector("div")?.innerText;

    const data=new Object();
    data["link"]=Link;
    data["title"]=Title;

    console.log(data);
    return data;
}


function closeMenu(menu) {
    setTimeout(() => {
        menu.remove(); // Directly remove the menu from the DOM
    }, 200);
}

const observer = new MutationObserver((mutationsList, observer) => {
   
    // for Fetching Pinned Chats...
    const sidebarCloseButton=document.querySelector('[aria-label="Open sidebar"]');
    sidebarCloseButton?.addEventListener("click",()=>{
        console.log("dd clicked");
        const sidebarParent = document.querySelector('div[class^="group/sidebar"]'); // Adjust this
        if (sidebarParent) {
            console.log('kkk');
            Sideobserver.observe(sidebarParent, { childList: true, subtree: true });
        } 
    });


    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            
            const menu = document.querySelector('[role="menu"]'); 
            const pin=menu?.querySelector("pin");
            if (menu&& !isAdded && !pin) {

                //  the actual Chat Containerr of the Menu..
                const ChatDiv=MenuParent();
                const ChatLink=FindData(ChatDiv);

                const isPin=ChatDiv.parentElement.parentElement.classList.contains("PinDivList");

                 const div=document.createElement("div");
                if(!isPin){
                    div.innerHTML=PinDiv;
                    div.addEventListener("click",(e)=>{
                        closeMenu(menu);
                        HistoryWithParent[ChatLink.link]=ChatDiv.parentElement.parentElement;
                        handleChatPin(ChatLink);
                    });
                }else{
                    div.innerHTML=UnPinDiv;
                    div.addEventListener("click",()=>{
                        // console.log("UnPinIc");
                        // Move the Pinned Chat from the Pinned Section to NormalSection....console.log(HistoryWithParent);

                        handleUnpin(ChatLink);
                        closeMenu(menu);
                        
                    });
                }

                menu.appendChild(div); 
                isAdded=true;
                break;
            }

            if(!menu){
                isAdded=false;
            }
        }
    }
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });