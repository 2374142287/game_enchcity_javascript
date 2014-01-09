/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 13-3-23
 * Time: 下午2:49
 * To change this template use File | Settings | File Templates.
 */
define(function(){
    var MailItemContainer = function(type)
    {
        MailItemContainer.superClass.constructor.call(this);
        this.init(type);
    };

    Q.inherit(MailItemContainer, Q.DisplayObjectContainer);

    MailItemContainer.prototype.init = function(type){
        this.width = 681;
        this.height = 129;
        this.x = 113;
        this.y = 203;
        //收信Rece还是发信Send
        this.type = type;
        if(this.type == "Rece") this.eventChildren = false;
        this.props = new Array();
        this.addChildAt(this.getBg(),0);
        this.container = new Q.DisplayObjectContainer({x:0,y:0,width:this.width,height:this.height});
        this.addChildAt(this.container,1);
        this.showProp();
    };

    MailItemContainer.prototype.showProp = function(){
        this.container.removeAllChildren();
        for(var i=0;i<this.props.length;i++){
            this.container.addChild(this.getBtn(i,this.props[i]));
        }
        if(this.type != "Rece"){
            for(var j=this.props.length;j<5;j++){
                this.container.addChild(this.getAddBtn(j));
            }
        }
    };

    MailItemContainer.prototype.getAddBtn = function(id){
        var btnwidth = 73;
        var btnheight = 73;
        var margin = 42;
        var px = 70 + (btnwidth + margin)*id;
        var py = 28;

        var btn = new Q.Button({image:LoadedImages.mailui.image, x:px,y:py,width:btnwidth,height:btnheight,
            up:{rect:[966,388,btnwidth,btnheight]},
            down:{rect:[966,388,btnwidth,btnheight]}
        });
        btn.addEventListener(events[2], function(e)
        {
            //在邮件中点击道具按钮
            Views.MainView.MessageContainer.showProps();
        });
        return btn;
    };

    MailItemContainer.prototype.getBtn = function(id,prop){
        var self = this;
        var btnwidth = 84;
        var btnheight = 84;
        var margin = 31;
        var px = 65 + (btnwidth + margin)*id;
        var py = 22;

        var btn = new Q.Button({image:Resources.getImage(prop.photo), x:px,y:py,width:prop.photow,height:prop.photoh,
            up:{rect:[prop.photox,prop.photoy,prop.photow,prop.photoh]},
            down:{rect:[prop.photox,prop.photoy,prop.photow,prop.photoh]}
        });
        btn.scaleX = btnwidth/prop.photow;
        btn.scaleY = btnheight/prop.photoh;
        btn.addEventListener(events[2], function(e)
        {
            //在邮件中点击道具按钮,删除当前道具
            self.props.splice(id,1);
            self.showProp();
        });
        return btn;
    };

    MailItemContainer.prototype.addPropById = function(propid)
    {
        var self = this;
        var prop = Views.MainView.ToolBarContainer.propShopManager.get(propid);
        if( prop!= -1){
            if(self.props.length>5) self.props.pop();
            if(self.getPropByPropid(propid) == -1) self.props.push(prop);
        }
        self.showProp();
    };
    MailItemContainer.prototype.getPropByPropid = function(propid)
    {
        for(var i=0;i<this.props.length;i++){
            if(this.props[i].propid == propid)
            {
                return this.props[i];
            }
        }
        return -1;
    };
    MailItemContainer.prototype.removeProp = function(propid)
    {
        var self = this;
        for(var i=0;i<self.props.length;i++){
            if(self.props[i].propid == propid)
            {
                self.props.splice(i,1);
                break;
            }
        }
        self.showProp();
    };
    MailItemContainer.prototype.clear = function(){
        var self = this;
        self.props = [];
        self.showProp();
    };

    MailItemContainer.prototype.getBg = function(){
        return new Q.Bitmap({image:LoadedImages.mailui.image,x:0,y:0,width:this.width,height:this.height,rect:[135,303,681,129]});
    };
    return MailItemContainer;
});
