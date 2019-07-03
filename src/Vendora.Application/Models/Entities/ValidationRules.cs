namespace Vendora.Application.Models.Entities
{
    public class ValidationRule
    {
        // validation error message
        public string Message { get; set; }

        // built-in validation type, available options: https://github.com/yiminghe/async-validator#type
        public string Type { get; set; }

        // indicates whether field is required
        public bool? Required { get; set; }
        
        // validate the min length of a field
        public int? Min { get; set; }

        // validate the max length of a field
        public int? Max { get; set; }
        
        // validate from a regular expression
        public string Pattern { get; set; }
    }
}
