//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Phone
    {
        public int Id { get; set; }
        public string PhoneId { get; set; }
        public string Carrier { get; set; }
        public Nullable<int> Age { get; set; }
        public string Snippet { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
    }
}
