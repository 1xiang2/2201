class login {
    constructor() {
        //给登陆按钮绑定点击事件
        this.$('.login_submit .submit').addEventListener('click', this.clickFn.bind())

    }
    clickFn(eve) {
        //获取页面form表单
        eve.preventDefault()
        let form = document.forms[0].elements;
        // console.log(form);

        //判断是否为空
        let username = form[0].value
        let password = form[1].value

        if (!username.trim() || !password.trim()) throw new Error('不能为空')
            // console.log(username, password)
            //要发送post请求
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let data = `username=${username}&password=${password}`;
        axios.post('http://localhost:8888/users/login', data).then(res => {
            // console.log(data);
            let { status, data } = res;
            if (status == 200) {
                if (data.code == 1) {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user_id', data.user.id)
                        //跳转
                        // console.log(location.search.split('='));
                    location.assign(location.search.split('=')[1])

                } else {
                    //登陆失败提示
                    layer.open({
                        title: '登陆提示',
                        content: '用户名或者密码输入错误'
                    });
                }
            }
        });
    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new login;