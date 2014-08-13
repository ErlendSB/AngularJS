using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;


namespace API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/phones")]
    public class PhonesController : ApiController
    {
        private PhoneDBContext db;

        public PhonesController()
        {
            this.db = new PhoneDBContext();
        }


        [Authorize(Roles="Admin,API")]
        public List<Phone> getAllPhones()
        {
            string cid = ClaimsPrincipal.Current.Claims.SingleOrDefault(c => c.Type == "companyid").Value;
            try
            {
                List<Phone> phones = this.db.Phones.ToList();
                return phones;

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.db.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
