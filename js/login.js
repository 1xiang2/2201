class login {
    constructor() {
        //给登陆按钮绑定点击事件
        this.$('.login_submit .submit').addEventListener('click', this.clickFn.bind())

    }
    clickFn(eve) {
        //获取页面form表单
        eve.preventDefault()
        let form = document.forms[0].elements;
        console.log(form);

        //判断是否为空
        let username = form[0].value
        let password = form[1].value
            // console.log(username, password)
        if (!username.trim() || !password.trim()) throw new Error('不能为空')
    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new login;