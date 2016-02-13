!function(){function e(e,i,n){this.scriptFile=e,this.script=i,this.enabled=n,e.indexOf("./core/")>-1&&(this.enabled=!0),this.getModuleName=function(){return this.scriptFile.replace(/([a-z]+)\.js$/i,"$1")}}function i(e,i,n){this.scriptFile=e,this.hook=i,this.handler=n}function n(e){Packages.com.gmt2001.Console.out.println(java.util.Objects.toString(e))}function t(){var e,i=function(e){var i,n=["getClass","equals","notify","class","hashCode","toString","wait","notifyAll"];for(i in n)if(n[i]==e)return!0;return!1},n=function(e,i){return function(){for(var n=[$script],t=0;t<arguments.length;t++)n.push(arguments[t]);e[i].save(e,n)}};for(e in $api)i(e)||("function"==typeof $api[e]?$[e]=n($api,e):$[e]=$api[e])}function o(i,t,o){if(!c(i)||t)try{var s,r=$api.loadScriptR($script,i);$.inidb.exists("modules",i)?s=$.getIniDbBoolean("modules",i):(s=!0,$.setIniDbBoolean("modules",i,s)),C.push(new e(i,r,s)),o||n("Loaded module: "+i.replace(/\.\//g,"")+" ("+(s?"Enabled":"Disabled")+")")}catch(a){n('Failed loading "'+i+'": '+a),c("./core/logging.js")&&$.logError("init.js",70,"(loadScript, "+i+") "+a)}}function s(e,i){e.substring($.strlen(e)-1).equalsIgnoreCase("/")&&(e=e.substring(0,$.strlen(e)-1));var n,t=$.findFiles("./scripts/"+e,"");for(n=0;n<t.length;n++)e.equalsIgnoreCase(".")&&(t[n].equalsIgnoreCase("util")||t[n].equalsIgnoreCase("lang")||t[n].equalsIgnoreCase("init.js")||t[n].equalsIgnoreCase("dev"))||($.isDirectory("./scripts/"+e+"/"+t[n])?s(e+"/"+t[n],i):o(e+"/"+t[n],!1,i))}function r(e){var i;for(i in C)if(C[i].scriptFile.equalsIgnoreCase(e))return i;return-1}function a(e){var i=r(e);return i>-1?C[i].enabled:!1}function c(e){return r(e)>-1}function l(e){var i=r(e);return i>-1?C[i]:null}function u(e,i){var n;for(n in w)if(w[n].scriptFile.equalsIgnoreCase(e)&&w[n].hook.equalsIgnoreCase(i))return n;return-1}function d(e,n){var t=$script.getPath().replace("\\","/").replace("./scripts/",""),o=u(t,e);o>-1?w[o].handler=n:w.push(new i(t,e,n))}function g(e){var i=$script.getPath().replace("\\","/").replace("./scripts/",""),n=u(i,e);n>-1&&w.splice(n,1)}function p(e,i,n){var t;if("command"==e){var t=u(getCommandScript(i.getCommand()),e);if(a(w[t].scriptFile)||n)try{w[t].handler(i)}catch(o){$.logError("init.js",265,"(hook.call, "+e+", "+w[t].scriptFile+") "+o)}}else for(t in w)if(w[t].hook.equalsIgnoreCase(e)&&(a(w[t].scriptFile)||n))try{w[t].handler(i)}catch(o){$.logError("init.js",274,"(hook.call, "+e+", "+w[t].scriptFile+") "+o)}}function m(){t(),o("./core/misc.js"),o("./core/jsTimers.js"),o("./core/updates.js"),o("./core/fileSystem.js"),o("./core/lang.js"),o("./core/logging.js"),o("./core/commandRegister.js"),o("./core/whisper.js"),o("./core/chatModerator.js"),o("./core/commandCoolDown.js"),o("./core/gameMessages.js"),o("./core/patternDetector.js"),o("./core/permissions.js"),o("./core/streamInfo.js"),o("./core/pointSystem.js"),o("./core/ranks.js"),o("./core/timeSystem.js"),$.logEvent("init.js",285,"Core loaded, initializing bot..."),s("."),$api.on($script,"ircChannelMessage",function(e){n($.username.resolve(e.getSender().toLowerCase(),e.getTags())+": "+e.getMessage()),e.getSender().equalsIgnoreCase("jtv")||e.getSender().equalsIgnoreCase("twitchnotify")?p("ircPrivateMessage",e,!1):p("ircChannelMessage",e,!1)}),$api.on($script,"ircJoinComplete",function(e){f=!0,$.channel=e.getChannel()}),$api.on($script,"ircChannelUserMode",function(e){f&&e.getChannel().getName().equalsIgnoreCase($.channel.getName())&&e.getUser().equalsIgnoreCase($.botName)&&e.getMode().equalsIgnoreCase("o")&&e.getAdd()&&(h||$.consoleLn($.username.resolve($.botName)+" is ready to receive commands!"),h=!0)}),$api.on($script,"command",function(e){var i,n,t=e.getSender().toLowerCase(),o=e.getTags(),s=e.getCommand().toLowerCase();if(($.isModv3(t,o)||!$.commandPause.isPaused())&&($.inidb.exists("aliases",s)&&e.setCommand($.inidb.get("aliases",s)),n=e.getCommand().toLowerCase(),$.commandExists(n)&&$.permCom(t,n)&&($.isAdmin(t)||(i=$.coolDown.get(n,t),!(i>0))))){if(a("./core/pointSystem.js")&&!$.isModv3(t,e.getTags())&&$.inidb.exists("pricecom",n)){if($.getUserPoints(t)<$.getCommandPrice(n))return void $.say($.whisperPrefix(t)+$.lang.get("cmd.needpoints",$.getPointsString($.inidb.get("pricecom",n))));parseInt($.inidb.get("pricecom",n))>0&&$.inidb.decr("points",t,$.inidb.get("pricecom",n))}p("command",e,!1)}}),$api.on($script,"consoleInput",function(e){p("consoleInput",e,!0)}),$api.on($script,"twitchFollow",function(e){p("twitchFollow",e,!0)}),$api.on($script,"twitchUnfollow",function(e){p("twitchUnfollow",e,!0)}),$api.on($script,"twitchFollowsInitialized",function(e){p("twitchFollowsInitialized",e,!0)}),$api.on($script,"twitchHosted",function(e){p("twitchHosted",e,!0)}),$api.on($script,"twitchUnhosted",function(e){p("twitchUnhosted",e,!0)}),$api.on($script,"twitchHostsInitialized",function(e){p("twitchHostsInitialized",e,!0)}),$api.on($script,"twitchSubscribe",function(e){p("twitchSubscribe",e,!0)}),$api.on($script,"twitchUnsubscribe",function(e){p("twitchUnsubscribe",e,!0)}),$api.on($script,"twitchSubscribesInitialized",function(e){p("twitchSubscribesInitialized",e,!0)}),$api.on($script,"ircChannelJoin",function(e){p("ircChannelJoin",e,!0)}),$api.on($script,"ircChannelLeave",function(e){p("ircChannelLeave",e,!0)}),$api.on($script,"ircChannelUserMode",function(e){p("ircChannelUserMode",e,!0)}),$api.on($script,"ircConnectComplete",function(e){p("ircConnectComplete",e,!0)}),$api.on($script,"ircJoinComplete",function(e){p("ircJoinComplete",e,!0)}),$api.on($script,"ircPrivateMessage",function(e){p("ircPrivateMessage",e,!1)}),$api.on($script,"musicPlayerConnect",function(e){p("musicPlayerConnect",e,!1)}),$api.on($script,"musicPlayerCurrentId",function(e){p("musicPlayerCurrentId",e,!1)}),$api.on($script,"musicPlayerCurrentVolume",function(e){p("musicPlayerCurrentVolume",e,!1)}),$api.on($script,"musicPlayerDisconnect",function(e){p("musicPlayerDisconnect",e,!1)}),$api.on($script,"musicPlayerState",function(e){p("musicPlayerState",e,!1)}),$api.on($script,"twitchAlertsDonation",function(e){p("twitchAlertsDonation",e,!0)}),$api.on($script,"twitchAlertsDonationInitialized",function(e){p("twitchAlertsDonationInitialized",e,!0)}),$.logEvent("init.js",553,"Bot locked & loaded!"),$.consoleLn("Bot locked & loaded!"),$api.on($script,"command",function(e){var i,n,t=e.getSender().toLowerCase(),s=$.username.resolve(t,e.getTags()),a=e.getCommand(),c=e.getArgs(),l=c[0];if(a.equalsIgnoreCase("reconnect")){if(!$.isModv3(t,e.getTags()))return void $.say($.whisperPrefix(t)+$.modMsg);$.logEvent("init.js",354,s+" requested a reconnect!"),$.connmgr.reconnectSession($.hostname),$.say($.lang.get("init.reconnect"))}if(a.equalsIgnoreCase("module")){if(!$.isAdmin(t))return void $.say($.whisperPrefix(t)+$.adminMsg);if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("init.module.usage"));if(l.equalsIgnoreCase("list")){i=[];for(n in C)C[n].enabled&&i.push(C[n].getModuleName());$.say($.whisperPrefix(t)+$.lang.get("init.module.list",i.length,i.join(", ")))}if(l.equalsIgnoreCase("enable")){if(i=c[1],!i)return void $.say($.whisperPrefix(t)+$.lang.get("init.module.usage"));if(i.indexOf("./core/")>-1||i.indexOf("./lang/")>-1)return;n=r(i),n>-1?($.logEvent("init.js",393,s+' enabled module "'+C[n].scriptFile+'"'),C[n].enabled=!0,$.setIniDbBoolean("modules",C[n].scriptFile,!0),o(C[n].scriptFile),p("initReady",null,!0),$.say($.whisperPrefix(t)+$.lang.get("init.module.enabled",C[n].getModuleName()))):$.say($.whisperPrefix(t)+$.lang.get("init.module.404"))}if(l.equalsIgnoreCase("disable")){if(i=c[1],!i)return void $.say($.whisperPrefix(t)+$.lang.get("init.module.usage"));if(i.indexOf("./core/")>-1||i.indexOf("./lang/")>-1)return;n=r(i),n>-1?($.logEvent("init.js",393,s+' disabled module "'+C[n].scriptFile+'"'),C[n].enabled=!1,$.setIniDbBoolean("modules",C[n].scriptFile,!1),$.say($.whisperPrefix(t)+$.lang.get("init.module.disabled",C[n].getModuleName()))):$.say($.whisperPrefix(t)+$.lang.get("init.module.404"))}if(l.equalsIgnoreCase("status")){if(i=c[1],!i)return void $.say($.whisperPrefix(t)+$.lang.get("init.module.usage"));n=r(i),n>1?C[n].enabled?$.say($.whisperPrefix(t)+$.lang.get("init.module.check.enabled",C[n].getModuleName())):$.say($.whisperPrefix(t)+$.lang.get("init.module.check.disabled",C[n].getModuleName())):$.say($.whisperPrefix(t)+$.lang.get("init.module.404"))}}a.equalsIgnoreCase("chat")&&$.say(e.getArguments())}),$.registerChatCommand("./init.js","chat",1),$.registerChatCommand("./init.js","module",1),$.registerChatCommand("./init.js","reconnect",2),p("initReady",null,!0)}var f=!1,h=!1,C=[],w=[];$.consoleLn=n,$.bind=d,$.unbind=g,$.bot={loadScript:o,loadScriptRecursive:s,isModuleLoaded:c,isModuleEnabled:a,getModule:l},m()}();
