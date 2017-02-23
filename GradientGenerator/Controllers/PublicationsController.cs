using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Web.WebSockets;
using System.Text;
using System.Threading;
using System.Xml.Serialization;

namespace GradientGenerator.Controllers
{
    public class PublicationsController : ApiController
    {
        public HttpResponseMessage Get()
        {
            if (HttpContext.Current.IsWebSocketRequest)
            {
                HttpContext.Current.AcceptWebSocketRequest(ProcessWSChat);
            }
            return new HttpResponseMessage(HttpStatusCode.SwitchingProtocols);
        }

        private static List<WebSocket> _sockets = new List<WebSocket>();

        private async Task ProcessWSChat(AspNetWebSocketContext context)
        {
            WebSocket socket = context.WebSocket;
            lock (_sockets)
            { 
                _sockets.Add(socket);
            }

            while (true)
            {
                ArraySegment<byte> buffer = new ArraySegment<byte>(new byte[1024]);
                WebSocketReceiveResult result = await socket.ReceiveAsync(
                    buffer, CancellationToken.None);
                if (socket.State == WebSocketState.Open)
                {
                    string userMessage = Encoding.UTF8.GetString(
                     buffer.Array, 0, result.Count);

                    XmlSerializer serializer = new XmlSerializer(typeof(GradientGenerator.Models.Gradient));
                    Models.Gradient gradient;
                    using (System.IO.TextReader reader = new System.IO.StringReader(userMessage))
                    {
                        gradient = (Models.Gradient)serializer.Deserialize(reader);
                    }

                    string reply = string.Format("Someone created gradient {0} ...and it is really cool! <br/>"+
                                                 "Click  <a href=\"javascript: void(0)\" onclick=\"changeGradientValues(&quot;{1}&quot;,&quot;{2}&quot;,{3},{4}); \">here</a> to see {0} gradient", 
                        gradient.Name, 
                        gradient.Color1.Trim(), 
                        gradient.Color2.Trim(), 
                        gradient.GradientDirection, 
                        gradient.GradientType);

                    DateTime.Now.ToLongTimeString();

                    lock (_sockets)
                    { 
                        foreach (WebSocket socketAux in _sockets.ToList())
                        {
                            try
                            {
                                if (socketAux.State == WebSocketState.Open)
                                {

                                    buffer = new ArraySegment<byte>(
                                        Encoding.UTF8.GetBytes(reply));

                                    Task sendMessage = socketAux.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
                                }
                            }
                            catch (System.ObjectDisposedException ex)
                            {
                                _sockets.Remove(socketAux);
                            }
                        }
                    }
                }
                else
                {
                    lock(_sockets)
                    {
                        _sockets.Remove(socket);
                    }
                    break;
                }
            }
        }
    }
}
