
import anime from 'animejs'
import React from 'react'
export const toggle = () => {
    const notes = []
    document.body.style.overflow = 'hidden'
    const addnote = (text, title='Уведомление') => {
        notes.push({
            text: text,
            title: title,
            id: notes.length
        })
        show(text,title,notes.length)
        console.log(notes)
    }
    const show = async(text='текст',title='Уведомление',id) => {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
        if(notes.length > 0){
            var x = [...document.getElementsByClassName('toglefield')]
            for(var key in x){
                var initial = Number(  window.screen.height - x[key].offsetTop) - 100
                var number = x[key].getAttribute('id')
                console.log(initial)
                anime({
                    targets: `#${number}`,
                    bottom: initial,
                    duration: 500
                })
            }
        }
        document.getElementById('root').insertAdjacentHTML('beforeend', 
        `<div class='toglefield' id='k${id-1}'style='width: 300px;
        min-height: 80px;
        background-color: rgba(0, 0, 0, 0.9);
        border-radius: 5px;
        position: absolute;
        bottom: 20px;
        right: -400px;
        color: white;
        padding: 5px;
        word-wrap: break-word;
        padding-left: 10px;
        '>
            <h4 style='
                margin: 0
            '>${title}</h4>
            <p style='margin: 0'>${text}</p>
        </div>`
        )
        const first = anime({
            targets: `#k${id-1}`,
            right: 20,
            duration: 500
        })
        await sleep(5000)
        const end = anime({
            targets: `#k${id-1}`,
            right: -400,
            duration: 500
        })
        await sleep(500)
        document.getElementById('k'+(id-1)).remove()
        console.log(id)
        notes.splice(id-1)
    }
    return{show, addnote}
}
export default toggle