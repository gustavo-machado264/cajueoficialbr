const products={
 perfume:{name:"Perfume Cajue",price:100},sabonete:{name:"Sabonete Vegetal",price:18},cabelos:{name:"Dupla para Cabelos",price:48},splash:{name:"Body Splash",price:65},hidratante:{name:"Hidratante Corporal",price:42},kit:{name:"Kit Especial Cajue",price:179.90}
};
let cart={};
const $=s=>document.querySelector(s);
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function count(){return Object.values(cart).reduce((sum,item)=>sum+item.qty,0)}
function renderCart(){
 const items=$("#cartItems"); const entries=Object.entries(cart);
 $("#cartCount").textContent=count();$("#cartTitleCount").textContent=`(${count()})`;
 $("#subtotal").textContent=money(entries.reduce((sum,[id,item])=>sum+products[id].price*item.qty,0));
 if(!entries.length){items.innerHTML='<div class="empty-cart">Sua sacola está vazia.<br><span>Escolha seus favoritos para começar.</span></div>';return}
 items.innerHTML=entries.map(([id,item])=>`<div class="cart-item"><div><h4>${products[id].name}</h4><p>${money(products[id].price)} cada</p><div class="qty"><button data-action="minus" data-id="${id}" aria-label="Diminuir quantidade">−</button><span>${item.qty}</span><button data-action="plus" data-id="${id}" aria-label="Aumentar quantidade">＋</button></div></div><div style="text-align:right"><strong>${money(products[id].price*item.qty)}</strong><br><button class="remove" data-action="remove" data-id="${id}">Remover</button></div></div>`).join("");
}
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2200)}
function openCart(){ $("#overlay").classList.add("show");$("#cartPanel").classList.add("show");$("#cartPanel").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeCart(){ $("#overlay").classList.remove("show");$("#cartPanel").classList.remove("show");$("#cartPanel").setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelectorAll(".add-button").forEach(btn=>btn.addEventListener("click",()=>{const id=btn.dataset.id;cart[id]??={qty:0};cart[id].qty++;renderCart();toast(`${products[id].name} adicionado à sacola`)}));
$("#cartItems").addEventListener("click",e=>{const b=e.target.closest("button[data-action]");if(!b)return;const {id,action}=b.dataset;if(action==="plus")cart[id].qty++;if(action==="minus"){cart[id].qty--;if(cart[id].qty<=0)delete cart[id]}if(action==="remove")delete cart[id];renderCart()});
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));document.querySelectorAll(".product-card").forEach(card=>card.hidden=btn.dataset.filter!=="todos"&&card.dataset.category!==btn.dataset.filter)}));
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$("#nav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
$("#checkout").addEventListener("click",()=>{if(!count()){toast("Adicione algum produto à sacola primeiro.");return}const lines=Object.entries(cart).map(([id,item])=>`${item.qty}x ${products[id].name} — ${money(products[id].price*item.qty)}`);const total=Object.entries(cart).reduce((s,[id,item])=>s+products[id].price*item.qty,0);const message=`Olá! Gostaria de fazer um pedido Cajue:\\n${lines.join("\\n")}\\nTotal: ${money(total)}\\n\\nPoderiam confirmar disponibilidade e entrega?`;const phone="";if(!phone){GenPlaceholderCheckout(message);return}window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`,"_blank","noopener");});
function GenPlaceholderCheckout(message){toast("Carrinho pronto! Configure o WhatsApp oficial em script.js para finalizar.");console.log("Mensagem de pedido pronta:",message)}
const slides=[{src:"assets/campanha.jpg",alt:"Perfume Cajue e embalagem da marca"},{src:"assets/perfume.jpg",alt:"Perfume Cajue em frasco dourado"},{src:"assets/body-splash.jpg",alt:"Body splash Cajue em cenário natural"}];let slideIndex=0;
function showSlide(index){slideIndex=(index+slides.length)%slides.length;const img=$("#heroSlide");img.style.opacity=".3";setTimeout(()=>{img.src=slides[slideIndex].src;img.alt=slides[slideIndex].alt;img.style.opacity="1"},120);document.querySelectorAll(".dot").forEach((dot,i)=>dot.classList.toggle("active",i===slideIndex))}
$("#slidePrev").addEventListener("click",()=>showSlide(slideIndex-1));$("#slideNext").addEventListener("click",()=>showSlide(slideIndex+1));document.querySelectorAll(".dot").forEach(dot=>dot.addEventListener("click",()=>showSlide(Number(dot.dataset.slide))));
renderCart();