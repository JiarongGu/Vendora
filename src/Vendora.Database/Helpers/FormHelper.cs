using System;
using System.Collections.Generic;
using System.Text;
using Vendora.Application.Models.Entities;

namespace Vendora.Database.Helpers
{
    public static class FormHelper
    {
        public static FormMetadata GetBasicEnquiryFormCN() {
            return new FormMetadata {
                FormSections = new List<FormSection> {
                    new FormSection {
                        Order = 0,
                        Label = "服务信息"
                    },
                    new FormSection {
                        Order = 1,
                        Label = "贷款信息"
                    },
                    new FormSection {
                        Order = 2,
                        Label = "财务信息"
                    },
                    new FormSection {
                        Order = 3,
                        Label = "个人信息"
                    }
                }
            };
        }

        public static FormMetadata GetBasicEnquiryFormEN()
        {
            return null;
        }
    }
}
