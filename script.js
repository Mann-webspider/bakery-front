

const stripePublicKey = 'pk_test_51N9YCGSEIF6HvjniEsEYPlLdt6aeJ9jASELIrnTn2kyQ6DAyFQoQqibg4vaAaEVxaJ7Xd8tufAqvNA56HXlGGn4L00gYKnGD80';
const stripe = Stripe(stripePublicKey);
const loader = document.querySelector(".loader");
async function sendItem(id){
    loader.classList.remove("hidden")
    const quan = document.querySelector(`#${id}`).value
    console.log("i clicked");
    const res =await fetch("https://bakery-topaz-rho.vercel.app/create-checkout-session",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            
                id:id,
                quantity:quan
            
        })
       
        
    }).then((response)=>{
        return response.json();

    }).then((data)=>{
        const {sessionId} = data;
         stripe.redirectToCheckout({
              sessionId: sessionId
            });
    }).catch((e)=>{
        console.log(e);
    }).finally(()=>{
        loader.classList.add("hidden")

        console.log(sessionId);
    })

}



  
