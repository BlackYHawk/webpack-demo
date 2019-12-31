/*
 * param.id string 控件id
 * param.refreshTopCallBack function 下拉刷新结束回调
 * param.refreshBottomCallBack function 上拉加载结束回调
 * param.selectCallBack function 点击具体行回调
 */
function DataList(param) {

    this.list = document.getElementById(param.id);
    this.id = param.id;

    //下拉刷新回调函数
    var config = function(list) {

        list.setRefreshBottom({
            textDown: '下拉刷新',
            textUp: '释放加载',
            textLoading: '加载中'
        });

        list.setRefreshTop({
            textDown: '上拉加载',
            textUp: '释放加载',
            textLoading: '加载中',
        });

        if (param.refreshTopCallBack != undefined) {
            list.addEventListener("top", function() {
                window.setTimeout(function() {
                    param.refreshTopCallBack();
                }, 1000)
            })
        }

        if (param.refreshBottomCallBack != undefined) {
            list.addEventListener("bottom", function() {
                param.refreshBottomCallBack();
            })
        }

        /*
         * index：row索引
         * data: 数据值
         * section:分组索引
         */
        list.addEventListener("select", function(index, data, section) {
            if (param.selectCallBack != undefined) {
                param.selectCallBack(index, data, section)
            }
        })
    };

    config(this.list);
    this.list.startRefreshTop();
}