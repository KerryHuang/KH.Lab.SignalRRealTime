using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace SignalRRealTime.Hubs
{   
    public class ServerPushHubs : Hub,IDisposable
    {
        private static Dictionary<string, bool> _connectionIds = new Dictionary<string, bool>();

        public void RefreshTimeline(string uid)
        {
            _connectionIds.Add(this.Context.ConnectionId, false);
            var msgTask = new Task(new Action<object>(PushUserMessage), uid);
            msgTask.Start();
        }

        private void PushUserMessage(object uid)
        {
            while (true)
            {
                if (_connectionIds[this.Context.ConnectionId])
                {
                    _connectionIds.Remove(this.Context.ConnectionId);
                    return;
                }

                string msg = GetNewMessage(uid.ToString());

                Clients.Caller.newMessage(msg);  //push new message to client

                string notice = GetSystemNotification();

                if (!string.IsNullOrEmpty(notice))
                    Clients.Caller.Notify(notice);
            }
        }

        public Task Disconnect()
        {
            if (_connectionIds.Keys.Contains(this.Context.ConnectionId))
            {
                _connectionIds[this.Context.ConnectionId] = true;
            }
            return null;
        }

        #region User Message Generator

        private string GetNewMessage(string uid)
        {
            Thread.Sleep(3000);
            return string.Format("message from xxx to {0}  ({1})", uid, DateTime.Now);

        }

        private string GetSystemNotification()
        {
            if (new Random().Next(6) >= 5)
                return "system will shutdown for maintenance";
            else
                return string.Empty;
        }

        #endregion
    }
}