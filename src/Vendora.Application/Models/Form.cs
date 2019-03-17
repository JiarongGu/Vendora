using System;
using System.Collections.Generic;
using System.Linq;
using Vendora.Application.Enums;

namespace Vendora.Application.Models
{
    public class Form
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string LanguageCode { get; set; }

        public IEnumerable<FormPage> FormMetadata { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }

    public class FormPage
    {
        public string Name { get; set; }

        public string Display { get; set; }

        public IEnumerable<FormSection> FormSections { get; set; }
    }

    public class FormSection
    {
        public string Name { get; set; }

        public string Display { get; set; }

        public IEnumerable<FieldDescriptor> FieldDescriptors { get; set; }
    }

    public class FieldDescriptor
    {
        public string Name { get; set; }

        public string Display { get; set; }

        public string MapType { get; set; }

        public FieldType FieldType { get; set; }

        public bool Required { get; set; }

        public IEnumerable<FieldOption> FieldOptions { get; set; } = Enumerable.Empty<FieldOption>();
    }

    public class FieldOption
    {
        public string Name { get; set; }

        public string Display { get; set; }

        public string Value { get; set; }
    }
}
