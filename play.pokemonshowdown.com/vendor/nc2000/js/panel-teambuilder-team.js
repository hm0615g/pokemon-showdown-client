"use strict";function _readOnlyError(r){throw new TypeError('"'+r+'" is read-only');}function _inheritsLoose(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,_setPrototypeOf(t,o);}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t;},_setPrototypeOf(t,e);}/**
 * Teambuilder team panel
 *
 * @author Guangcong Luo <guangcongluo@gmail.com>
 * @license AGPLv3
 */var










TeamRoom=function(_PSRoom){















function TeamRoom(options){var _this$team;var _this;
_this=_PSRoom.call(this,options)||this;_this.team=void 0;_this.teamDeleted=false;_this.forceReload=false;_this.editor=void 0;_this.clientCommands=_this.parseClientCommands({'validate':function(target){if(this.team.format.length<=4){return this.errorReply(TL(["You must select a format first."]));}this.send("/utm "+this.team.packedTeam);this.send("/vtm "+this.team.format);}});_this.






onParentKeyDown=function(e){var _this$editor;
return(_this$editor=_this.editor)==null||_this$editor.handleParentKeyDown==null?void 0:_this$editor.handleParentKeyDown(e);
};var team=PS.teams.byKey[_this.id.slice(5)]||null;_this.team=team;_this.title="[Team] "+(((_this$team=_this.team)==null?void 0:_this$team.name)||'Not found');if(team)_this.setFormat(team.format);_this.load();return _this;}_inheritsLoose(TeamRoom,_PSRoom);var _proto=TeamRoom.prototype;_proto.
getTitle=function getTitle(){var _this$team2;
return"["+TL.term.team+"] "+(((_this$team2=this.team)==null?void 0:_this$team2.name)||(this.teamDeleted?TL(["Team deleted"]):TL(["Not found"])));
};_proto.
getTeam=function getTeam(){var _this$team3;
var team=PS.teams.byKey[this.id.slice(5)]||null;
this.teamDeleted=!team&&(!!this.team||this.teamDeleted);
this.team=team;
this.title="[Team] "+(((_this$team3=this.team)==null?void 0:_this$team3.name)||(this.teamDeleted?'Team deleted':'Not found'));
return team;
};_proto.
setFormat=function setFormat(format){
var team=this.team;
team.format=toID(format);
};_proto.
load=function load(){var _PS$teams$loadTeam,_this2=this;
(_PS$teams$loadTeam=PS.teams.loadTeam(this.team,true))==null||_PS$teams$loadTeam.then(function(){
_this2.update(null);
});
};_proto.
cancelUpload=function cancelUpload(){
};_proto.
stripNicknames=function stripNicknames(packedTeam){
var team=Teams.unpack(packedTeam);for(var _i2=0;_i2<
team.length;_i2++){var pokemon=team[_i2];
pokemon.name='';
}
return Teams.pack(team);
};_proto.
save=function save(){var _this$team4;
PS.teams.save();
var title="[Team] "+(((_this$team4=this.team)==null?void 0:_this$team4.name)||'Team');
if(title!==this.title){
this.title=title;
PS.update();
}
};return TeamRoom;}(PSRoom);var



TeamPanel=function(_PSRoomPanel){





function TeamPanel(props){var _this3;
_this3=_PSRoomPanel.call(this,props)||this;_this3.







































































































handleRename=function(ev){
var textbox=ev.currentTarget;
var room=_this3.props.room;

room.team.name=textbox.value.trim();
room.save();
};_this3.

handleChangeFormat=function(ev){
var dropdown=ev.currentTarget;
var room=_this3.props.room;

room.setFormat(dropdown.value);
room.save();
_this3.forceUpdate();
TeamPanel.getFormatResources(room.team.format).then(function(){
_this3.forceUpdate();
});
};_this3.
save=function(){
_this3.props.room.save();
_this3.forceUpdate();
};var _room=_this3.props.room;if(_room.team){TeamPanel.getFormatResources(_room.team.format).then(function(){_this3.forceUpdate();});}return _this3;}_inheritsLoose(TeamPanel,_PSRoomPanel);TeamPanel.getFormatResources=function getFormatResources(format){this.formatResources[format]=null;return Promise.resolve(this.formatResources[format]);};var _proto2=TeamPanel.prototype;_proto2.
renderResources=function renderResources(){
var room=this.props.room;
var team=room.team;
var info=TeamPanel.formatResources[team.format];
var formatName=BattleLog.formatName(team.format);
return info&&(info.resources.length||info.url)?
preact.h("details",{"class":"details",open:true},
preact.h("summary",null,preact.h("strong",null,TL(["Teambuilding resources for ",""],formatName))),
preact.h("div",{style:"margin-left:5px"},preact.h("ul",null,
info.resources.map(function(resource){return(
preact.h("li",null,preact.h("p",null,preact.h("a",{href:resource.url,target:"_blank"},resource.resource_name))));}
)
),
preact.h("p",null,"Find ",
info.resources.length?'more ':'',"helpful resources for ",
formatName," on ",preact.h("a",{href:info.url,target:"_blank"},"the Smogon Dex"),"."
))
):
null;
};_proto2.
componentDidUpdate=function componentDidUpdate(){
var room=this.props.room;
room.load();
};_proto2.
render=function render(){
var room=this.props.room;
var team=room.getTeam();
if(!team||room.forceReload){
if(room.forceReload){
room.forceReload=false;
room.update(null);
}
return preact.h(PSPanelWrapper,{room:room},
preact.h("a",{"class":"button",href:"teambuilder","data-target":"replace"},
preact.h("i",{"class":"fa fa-chevron-left","aria-hidden":true})," ",TL(["Teams"])
),
preact.h("p",{"class":"error"},
room.teamDeleted?TL(["Team was deleted"]):TL(["Team doesn't exist"])
)
);
}

return preact.h(PSPanelWrapper,{room:room},
preact.h("div",{"class":"team-pad"},
preact.h("a",{"class":"button",href:"teambuilder","data-target":"replace"},
preact.h("i",{"class":"fa fa-chevron-left","aria-hidden":true})," ",TL(["Teams"])
)," ",
preact.h("span",{"class":"button disabled"},
preact.h("i",{"class":"fa fa-laptop","aria-hidden":true})," ",TL(["Local"])
),

preact.h("div",{style:room.width<550?"margin-top:8px":"float:right"},preact.h("button",{
name:"format",value:team.format,"data-selecttype":"teambuilder",
"class":"select formatselect","data-href":"/formatdropdown",onChange:this.handleChangeFormat},

preact.h("i",{"class":"fa fa-folder-o"})," ",BattleLog.formatName(team.format)," ",
team.format.length<=4&&preact.h("em",null,TL(["(uncategorized)"]))
)),
preact.h("label",{"class":"label teamname"},"Team name:",

preact.h("input",{
"class":"textbox",type:"text",defaultValue:team.name,
onInput:this.handleRename,onChange:this.handleRename,onKeyUp:this.handleRename}
)
)
),
preact.h(TeamEditor,{
team:team,onChange:this.save,readOnly:false,resources:this.renderResources(),
narrow:room.width<550,
editorRef:function(editor){room.editor=editor;}},

!!(team.packedTeam&&team.format.length>4)&&preact.h("p",null,
preact.h("button",{"data-cmd":"/validate","class":"button"},preact.h("i",{"class":"fa fa-check"})," ",TL(["[Validate]"]))
)
)
);
};return TeamPanel;}(PSRoomPanel);TeamPanel.id='team';TeamPanel.routes=['team-*'];TeamPanel.Model=TeamRoom;TeamPanel.title='Team';TeamPanel.formatResources={};PS.addRoomType(TeamPanel);
//# sourceMappingURL=panel-teambuilder-team.js.map