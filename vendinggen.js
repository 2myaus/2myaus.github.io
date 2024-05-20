(() => {
	//const canvas = document.createElement("canvas");
    const canvas = document.querySelector("#vendingcanvas").parentElement.querySelector("canvas");//TODO: Unhack this
	canvas.height = canvas.width * canvas.offsetHeight / canvas.offsetWidth;

	const ctx=canvas.getContext("2d");

    const floorheight = canvas.height*0.12;

    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, "#000030");
    bgGradient.addColorStop(1.0, "#4fdef4")

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const v1 = {
        color: "#ff50a0",
        height:400,
        width:200
    };
    const v2 = {
        color: "#10c8ff",
        height:400,
        width:200
    };

    /* floor */

    const floordrawheight = canvas.height-floorheight-canvas.height*0.1;
    let n = 0;
    const inc = 50;
    for(let x = -canvas.width*0.5; x <= canvas.width*1.5; x += inc){
        for(let y = canvas.height/2; y <= canvas.height+inc; y += inc){
            //if(n % 2 != 0){n++; continue;}
            const corners = [
                {
                    x: x - inc,
                    y: y - inc      
                },
                {
                    x: x,
                    y: y - inc
                },
                {
                    x: x,
                    y: y
                },
                {
                    x: x - inc,
                    y: y
                }
            ]

            ctx.beginPath();
            let i = 0;

            ctx.lineWidth = 4;
            ctx.strokeStyle = "#000";

            const transformPoint = (px, py) => {
                px -= canvas.width * 0.5;
                px *= (py/canvas.height)*2;
                px += canvas.width*0.5;
                return [px, py];
            }

            corners.forEach((corner) => {
                [corner.x, corner.y] = transformPoint(corner.x, corner.y)

                if(i == 0) ctx.moveTo(corner.x, corner.y);
                else ctx.lineTo(corner.x, corner.y);
                i++;
            });
            ctx.closePath();

            const tileGradient = ctx.createLinearGradient(x, y - inc, x, y);
            tileGradient.addColorStop(0, "#c7fcff");
            tileGradient.addColorStop(0.1, "#27c6f3");
            tileGradient.addColorStop(0.9, "#27c6f3");
            tileGradient.addColorStop(1.0, "#063d84")

            ctx.fillStyle = tileGradient;
            ctx.fill();
            ctx.stroke();

            n++;   
        }
        n++;
    }

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, floordrawheight);

    /* Vending machine 1 */
    ctx.fillStyle = v1.color;
    ctx.fillRect(canvas.width/4-v1.width*0.5, canvas.height-v1.height-floorheight, v1.width, v1.height);

    /* Vending machine 2 */
    ctx.fillStyle = v2.color;
    ctx.fillRect(3*canvas.width/4-v1.width*0.5, canvas.height-v2.height-floorheight, v2.width, v2.height);
})();