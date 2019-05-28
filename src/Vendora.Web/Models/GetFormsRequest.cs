namespace Vendora.Web.Models
{
    public class GetFormsRequest
    {
        public string Name { get; set; }
        public string Language { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
    }
}
