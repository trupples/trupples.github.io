"use strict";
var terminal=document.querySelector("#terminal"),input=document.querySelector("#input"),sanitizer=document.createElement("div");
function splitCommand(a){for(var b=[],k="",l="no_enclosure",o=0;o<a.length;o++)"\\"==a[o]?k+=a[++o]:"no_enclosure"==l?a[o].match(/\s/)?(k.length&&b.push(k),k=""):"\""==a[o]?(k.length&&b.push(k),k="",l="double_quote_enclosure"):"'"==a[o]?(k.length&&b.push(k),k="",l="single_quote_enclosure"):k+=a[o]:"double_quote_enclosure"==l?"\""==a[o]?(b.push(k),k="",l="no_enclosure"):k+=a[o]:"single_quote_enclosure"==l?"'"==a[o]?(b.push(k),k="",l="no_enclosure"):k+=a[o]:void 0;if("no_enclosure"==l)k.length&&b.push(k);else throw"Unbalanced quotes";return b}
function error(a){sanitizer.textContent=a,terminal.innerHTML+="<span class=\"red\">Error: "+sanitizer.innerHTML+"</span><br>"}
function output(a){terminal.innerHTML+=a+"<br>"}
function run(a){var b;try{b=splitCommand(a)}catch(l){error(l)}if(b[0]){var k=commands[b[0]];k?k.fn(b.slice(1)):error("Unknown command "+b[0])}}
function runAndClear(){terminal.innerHTML+=input.innerHTML,run(input.textContent),input.textContent="",displayPrompt()}
function displayPrompt(){terminal.innerHTML+="<br><span class=\"green\">tu@iorga</span>&nbsp;<span class=\"blue\">~</span>&nbsp;$&nbsp;"}
document.body.addEventListener("keydown",function(e){if(e.ctrlKey||e.shiftKey||e.altKey||e.metaKey)return;input.focus()},!1)
input.addEventListener("keyup",function(a){(13===a.keyCode||"Enter"===a.key||"Enter"===a.code)&&runAndClear(),window.scrollTo(0,document.body.scrollHeight)})
input.addEventListener("paste",function(a){var b=a.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,b),a.preventDefault()})
function glitch(){for(var a=["###","Hhh","aA4","c<C","kKX","I1i","o0O","rRR","gG9","a4A","!|1"],b=Array.from(document.querySelectorAll(".glitch span")),k=0;k<b.length;k++){var l=k%a.length,o=Math.floor(3*Math.pow(Math.random(),33));b[k].textContent=a[l].charAt(o);var s=Math.floor(7*Math.pow(Math.random(),40));b[k].style.color=["#fff","#00f","#0f0","#0ff","#f00","#f0f","#ff0"][s]}setTimeout(glitch,100)}
var files={"call-to-action.md":"<div class='banner'><h1 class='glitch'><span>#</span><span>H</span><span>a</span><span>c</span><span>k</span><span>I</span><span>o</span><span>r</span><span>g</span><span>a</span><span>!</span></h1><h2>Un club de cyber security si white hat hacking</h2></div><br><br>Bine ai venit! Pe acest site sunt ascunse 10 secrete si te provoc sa le gasesti pe toate. Secretele sunt niste bucati de <strike>drog</strike> text in formatul:<br><span class=green>secret{litere, cifre si simboluri}</span><br><br>Foloseste comanda help (scrii help dupa dai enter) ca sa vezi ce poti face.<br><br>Daca esti interesat sa participi, ai vreo nelamurire, vrei hint la un secret sau orice altceva da-mi un email la <a href='mailto:ioandr@gomir.pw'>ioandr@gomir.pw</a>!<br>Nu trebuie sa gasesti secretele pentru a participa, le-am pus doar ca o mica provocare relevanta clubului :)",
"crypto-5.txt":"<h2>Criptografie - 5 puncte</h2><br>Ai fost fasolit<br>01110011 01100101 01100011 01110010 01100101 01110100 01111011 01100110 01100001 01110011 01101111 01101100 01100101 00101101 01100001 01110010 01011111 01101000 01100001 01101000 01100001 01011111 01100111 01100101 01110100 01011111 01101001 01110100 01111101",
"crypto-6.txt":"<h2>Criptografie - 6 puncte</h2><br>What the hecks?<br>73 65 63 72 65 74 7b 31 36 5f 64 69 6e 74 72 2d 6f 5f 6c 6f 76 69 74 75 72 61 7d",
"crypto-10.txt":"<h2>Criptografie - 10 puncte</h2><br>Brutus mi-a cerut sa-l ajut sa decifreze asta:<br>tfdsfu{dfabs_b_gptu_ebd_SPNB_qbnbou_SPNBoftd}",
"crypto-15.txt":"<h2>Criptografie - 15 puncte</h2><br>c2VjcmV0ezVoNGQwd19kNGRkeX0=",
"web-5.txt":"<h2>Website hacking - 5 puncte</h2><br>Take a look around... Poate gasesti ceva chiar aici",
"web-10.txt":"<h2>Website hacking - 10 puncte</h2><br>Poate ti-a placut posterul...<br>Vezi ce gasesti la <a href='./web10.html'>/web10.html</a>",
"web-25.txt":"<h2>Website hacking - 25 puncte</h2><br>Ce nu fac eu ce alte site-uri fac? Hint: Din cauza Comisiei Europeane e ilegal. Nu era pana pe 12 iulie 2002.",
"stegano-60.txt":"<h2>Steganografie - 20 + 40 puncte</h2><br>Hidden in plain sight. In poza de mai jos se gasesc DOUA secrete:<br><br><img src='stegano.bmp'/>"}
function cat(a){var _iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var l,b,k=a[Symbol.iterator]();!(_iteratorNormalCompletion=(l=k.next()).done);_iteratorNormalCompletion=!0)b=l.value,files[b]?output(files[b]):error("No such file "+b)}catch(o){_didIteratorError=!0,_iteratorError=o}finally{try{!_iteratorNormalCompletion&&k.return&&k.return()}finally{if(_didIteratorError)throw _iteratorError}}}
function help(){for(var a in commands)output((commands[a].name||a)+":<br>&nbsp;&nbsp;&nbsp;&nbsp;"+commands[a].help+"<br>")}
String.prototype.hashCode=function(){var b,i,a=0;if(this.length==0)return a;for(i=0;i<this.length;i++){b=this.charCodeAt(i);a=((a<<5)-a)+b;a=a&a}return a}
function verify(a){var l={
793812952:5,966227250:6,2075005616:10,"-275461730":15, // crypto
1162487522:5,"-1607759220":10,1676526268:25, // web
720110490:1,//bonus
1212578676:20,"-1147793825":40//stegano
}[a[0].hashCode()];l?output("Oooo nice! Ai primit <span class='green'>"+l+"</span> punct"+(1==l?"":"e")+"."):error("Nu e bun :/")}
function ls(){for(var a in files)output(a)}
var commands={cat:{fn:cat,name:"cat &lt;fisier&gt; &lt;fisier&gt; &lt;fisier&gt; ...",help:"Afiseaza continuturile fisierelor date ca argumente."},
clear:{fn:function fn(){return terminal.innerHTML=""},help:"Sterge tot de pe ecran."},
help:{fn:help,help:"Afiseaza acest mesaj de help."},
ver:{fn:verify,name:"ver secret{...}",help:"Verifica daca secretul dat ca argument e corect. Hmm... ca sa testezi incearca cu <span class=green>\x73\x65\x63\x72\x65\x74\x7b\x62\x72\x34\x76\x30\x5f\x61\x69\x5f\x63\x31\x74\x69\x37\x5f\x72\x33\x67\x75\x6c\x31\x6c\x65\x7d</span>!"},
ls:{fn:ls,help:"Listeaza fisierele din directorul curent."}},
_0xf2d1=["cookie","\x6d\x5f\x61\x69\x5f\x67\x61\x73\x69\x74\x3d\x73\x65\x63\x72\x65\x74\x7b\x6d\x6d\x6d\x5f\x66\x75\x72\x73\x65\x63\x75\x72\x69\x7d"];document[_0xf2d1[0]]=_0xf2d1[1]
for(var q=Array.from("cat call-to-action.md"),i=0;i<q.length;i++) 
	setTimeout(function(){input.textContent+=q.shift()},30*i)
setTimeout(function(){runAndClear(),input.contentEditable="true"},30*q.length)
terminal.innerHTML=""
displayPrompt()
glitch()