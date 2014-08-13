using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/pdf")]
    public class PDFController : ApiController
    {
        public HttpResponseMessage getPDF()
        {
            // The content to render
            String content = "<html><head><title>PDFreactor .NET API Sample Document</title></head>";
            content += "<body><h3>This is a demonstration of the PDFreactor .NET API</h3>";
            content += "<p>This PDF was created with the code shown below:</p>";
            content += "<pre style=\"font-size: 8pt\">hello</pre>";
            content += "<p>Please see the <a href=\"../apidoc/PDFreactor.html\">API documentation</a> for more information.</p></body></html>";

            // Create new PDFreactor instance
            PDFreactor pdfReactor = new PDFreactor();

            // Set a base URL for images, style sheets, links
            //pdfReactor.SetBaseURL("http://" + Request.ServerVariables["HTTP_HOST"] + Request.ServerVariables["SCRIPT_NAME"]);

            //pdfReactor.SetAppendLog(true);
            // Set an appropriate log level
            pdfReactor.SetLogLevel(PDFreactor.LOG_LEVEL_WARN);

            // Sets the title of the created PDF
            pdfReactor.SetTitle("Demonstration of the PDFreactor .NET API");

            // Sets the author of the created PDF
            pdfReactor.SetAuthor("Myself");

            // Enables links in the PDF document.
            pdfReactor.SetAddLinks(true);

            // Enable bookmarks in the PDF document
            pdfReactor.SetAddBookmarks(true);

            // Set some viewer preferences
            pdfReactor.SetViewerPreferences(PDFreactor.VIEWER_PREFERENCES_FIT_WINDOW | PDFreactor.VIEWER_PREFERENCES_PAGE_MODE_USE_THUMBS);

            // Add user style sheets
            // e.g. format landscape
            pdfReactor.AddUserStyleSheet("@page { " +
                                             "size: A4 portrait;" +
                                             " @bottom-center {" +
                                                 "text-align: center;" +
                                                 "font: 12pt Arial, Helvetica, sans-serif;" +
                                                 "color: #7F7F7F;" +
                                                 "content: \"Created on " + System.DateTime.Now + "\";" +
                                                 "margin-bottom: 1cm;" +
                                             "}" +
                                         "}", "", "", "");
            pdfReactor.AddUserStyleSheet("h3 { color: red; }", "", "", "");

            // Render document and save result to $result
            byte[] pdfBytes = pdfReactor.RenderDocumentFromURL("http://www.isavedialog.com");

            if (pdfBytes == null)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, "value");
                content = "<h1>Ero During Rendring</h1>";
                content += "<h2>" + pdfReactor.GetError() + "</h2>";
                content += "<pre>" + pdfReactor.GetLog() + "</pre>";
                response.Content = new StringContent(content);
                return response;
            }
            else
            {

                /* generate the pdf into pdfBytes */

                string cleanTitle = "test";
                string contentDisposition = string.Concat("attachment; filename=", cleanTitle, ".pdf");
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, pdfBytes, MediaTypeHeaderValue.Parse("application/pdf"));
                response.Content.Headers.ContentDisposition = ContentDispositionHeaderValue.Parse(contentDisposition);
            return response;
            }
        }
    }
}
