class leibiao {
    constructor() {
            //给属性赋值
            this.getDate()

        }
        //获取数据
    async getDate() {
        //等待promise对象解包完成
        let num = 15;
        let { data, status } = await axios.get('http://localhost:8888/goods/list?pagesize=' + num)
            // console.log(res);
        if (status == 200) {
            console.log(data);
            let html = '';
            data.list.forEach(goods => {
                console.log(goods);
                html += `
                <div class="mingxing fl mb20" style="border:2px solid #fff;width:230px;height:400px;cursor:pointer;" onmouseout="this.style.border='2px solid #fff'" onmousemove="this.style.border='2px solid red'">
                    <div class="sub_mingxing">
                    <a href=""><img src="${goods.img_big_logo}" alt="" style='width:100%'></a>
                     </div>
                    <div class="pinpai"><a href="">${goods.title}</a></div>
                    <div class="jiage">现价:${goods.price}</div>
                    <div class= jiaru >加入购物车</div>
            </div>`
            });
            this.$('#liebiao').innerHTML = html;
        }


    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new leibiao