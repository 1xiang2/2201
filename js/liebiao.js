class leibiao {
    constructor() {
            //给属性赋值
            this.getDate()
                //将加入购物车的方法使用事件委托
            this.$('#liebiao').addEventListener('click', this.addCartFn.bind(this))
        }
        //获取数据
    async getDate() {
            //等待promise对象解包完成
            let num = 15;
            let { data, status } = await axios.get('http://localhost:8888/goods/list?pagesize=' + num)
                // console.log(res);
            if (status == 200) {
                // console.log(data);
                let html = '';
                data.list.forEach(goods => {
                    // console.log(goods);
                    html += `
                <div class="mingxing fl mb20" data-id="${goods.goods_id}" style="border:2px solid #fff;width:230px;height:400px;cursor:pointer;" onmouseout="this.style.border='2px solid #fff'" onmousemove="this.style.border='2px solid red'">
                    <div class="sub_mingxing">
                    <a href=""><img src="${goods.img_big_logo}" alt="" style='width:100%'></a>
                     </div>
                    <div class="pinpai"><a href="">${goods.title}</a></div>
                    <div class="jiage"><b>现价:${goods.current_price} </b> <del class="shanchu">￥${goods.price}</del> <br></br>剩余:${goods.goods_number}  已售:${goods.sale_type}</div>
                    <div class= jiaru >  <a href="#none" class='sk_goods_buy'>加入购物车</a></div>
            </div>`
                });
                this.$('#liebiao').innerHTML = html;
            }
        }
        //加入购物车的方法
    async addCartFn(eve) {
        // console.log(eve.target);
        //判断用户是否登录.如果能够获取到token,则表示登录
        let token = localStorage.getItem('token')
            //跳转
        if (!token) location.assign('./login.html?ReturnUrl=./liebiao.html')
            //判断是否点击的是a标签
        if (eve.target.classList.contains('sk_goods_buy')) {
            let lisObj = eve.target.parentNode.parentNode;
            let goodsId = lisObj.dataset.id - 0
                // console.log(goodsId);
            let userid = localStorage.getItem('user_id') - 0
            if (!userid || !goodsId) throw new Error('两个id,存在问题,请打印...')
            axios.defaults.headers.common['authorization'] = token;
            let params = `id=${userid}&goodsId=${goodsId}`
                //如果用户登录则将数据信息添加到购物车当中
            let { data, status } = await axios.post('http://localhost:8888/cart/add', params)
            console.log(data);
            if (status == 200) {
                if (data.code == 1) {
                    //购买成功
                    layer.open({
                        content: '加入购物车',
                        btn: ['去购物车结算 ', '留在当前页面'],
                        yes: function(index, layero) {
                            //按钮1的回调
                        },
                        btn2: function(index, layero) {
                            //按钮2的回调
                        }
                    })
                } else {
                    //购买失败
                }
            }



        }

    }

    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new leibiao