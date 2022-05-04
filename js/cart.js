class cart {
    constructor() {
            this.checkLogin()
            this.getCartGoods()
            this.bindEve();
            //操作购物车页面必须登录
        }
        //绑定事件的方法
    bindEve() {
        this.$('#gec').addEventListener('click', this.distributeEve.bind(this));
        //全选按钮绑定事件
        this.$('.sub_top input').addEventListener('click', this.clickAllChecked.bind(this))
    }

    async checkLogin() {
            //获取token值进行判断
            const TOKEN = localStorage.getItem('token');
            //判断登录是否过期
            axios.defaults.headers.common['authorization'] = TOKEN;
            let userId = localStorage.getItem('user_id')
            let { data, status } = await axios.get('http://localhost:8888/users/info/' + userId)
            console.log(data);
            if (!TOKEN) {
                // location.assign('./login.html?ReturnUrl=./cart.html')
                location.assign('../login.html?ReturnUrl=./gouwuche.html')
            }

        }
        //获取购物车数据
    async getCartGoods() {
            const TOKEN = localStorage.getItem('token');
            let userId = localStorage.getItem('user_id')
            axios.defaults.headers.common['authorization'] = TOKEN;
            let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + userId)
                // console.log(data);
            if (status == 200) {

                // console.log(data.cart);
                //判断接口状态
                if (data.code == 1) {
                    let html = '';
                    data.cart.forEach(goods => {
                        html += `
                    <div data-id='${goods.goods_id}' class="content2 center" id="gec"   >
                     <div class="sub_content fl ">
                    <input type="checkbox" value="quanxuan" class="quanxuan" id='quanxuan'/>
                </div>
                <div class="sub_content fl"><img src="${goods.img_small_logo}"></div>
                <div class="sub_content fl ft20"  style="font-size:16px"><p class="xh">${goods.title}</p></div>
                <div class="sub_content fl ">${goods.price}</div>
                <div class="sub_content fl">
                    <input class="shuliang" type="number" value="${goods.cart_number}" step="1" min="1">
                </div>
                <div class="sub_content fl zhongjia">${goods.price * goods.cart_number}</div>
                <div class="sub_content fl"><a href="javascript:;" class="del">X</a></div>
                <div class="clear"></div> 
                </div>
             `
                    });
                    // console.log(this.$('#gec'));
                    this.$('#gec').innerHTML = html;
                }
            }
        }
        //获取页面中所有选择商品的价格数量
    getNumPriceGoods() {
            let goods = this.$('#gec');
            // console.log(goods);
            //保存数量价格
            let totalNum = 0;
            let totalPrice = 0;
            goods.forEach(one => {
                // console.log(one.firstElementChild.firstElementChild);
                // console.log(one.querySelector('.shuliang').value);
                if (one.firstElementChild.firstElementChild.checked) {
                    totalNum = one.querySelector('.shuliang').value - 0 + totalNum;
                    // console.log(one);
                    // console.log(one.querySelector('.sun').innerHTML);
                    // console.log(totalNum);
                    totalPrice = one.querySelector('.zhongjia').innerHTML - 0 + totalPrice;

                }
            })
            console.log(this.$('.zongxuan'));
            // let res = goods[Symbol.iterator]()
            // console.log(res.next());
            // res.next()
            // console.log(totalPrice);
            //设置的总计上
            this.$('.zongxuan')[0].innerHTML = totalNum;
            this.$('.zongxuan')[1].innerHTML = totalNum;
            this.$('.zongqian').innerHTML = totalPrice;
        }
        //将单个商品的操作委托给gwcxd
    distributeEve({ target }) {
            // console.log(target);
            //判断是否有content2这个类,是则点击为删除按钮
            if (target.classList.contains('del')) {
                //确认是否删除
                let laverIndex = layer.confirm('你要狠心抛弃我吗?', {
                        title: '删除提示'
                    }, function() {
                        // console.log('确定了');
                        let ulobj = target.parentNode.parentNode;
                        // console.log(ulobj);
                        let id = ulobj.dataset.id;
                        // console.log(id);
                        //获取用户id
                        let userid = localStorage.getItem('user_id')
                            // console.log(userid);
                            //发送ajax删除商品数据
                            // console.log(id, userid);
                        axios.get('http://localhost:8888/cart/remove?id=' + userid + '&goodsId=' + id).then(res => {
                            let { data, status } = res;
                            // console.log(data, status);
                            if (data.code == 1) {
                                //删除成功,关闭弹出框,删除对应商品
                                layer.close(laverIndex)
                                layer.msg('商品删除成功')
                                    //在页面中删除节点
                                ulobj.remove();
                            }

                        })

                    })
                    // console.log(111);
                    //获取商品id
                    // let id =



            }
        }
        //全选的实现
    clickAllChecked(eve) {
            // console.log(eve.target);
            //获取全选按钮状态
            let checked = eve.target.checked;
            // console.log(checked);
            this.oneGoodsCheck(checked)
                //统计数量和价格方法
            this.getNumPriceGoods()
        }
        //设置单个商品按选中状态
    oneGoodsCheck(checked) {
        let goodsList = this.$('.quanxuan')
            // console.log(goodsList);
        goodsList.forEach(item => {
                item.checked = checked
            })
            // goodsList.checked = checked
    }


    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new cart()