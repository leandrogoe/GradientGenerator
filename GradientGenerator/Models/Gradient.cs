using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GradientGenerator.Models
{

    /// <remarks/>
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
    public partial class Gradient
    {
        private string color1Field;

        private string color2Field;

        private byte gradientDirectionField;

        private byte gradientTypeField;

        private string nameField;

        /// <remarks/>
        public string Color1
        {
            get
            {
                return this.color1Field;
            }
            set
            {
                this.color1Field = value;
            }
        }

        /// <remarks/>
        public string Color2
        {
            get
            {
                return this.color2Field;
            }
            set
            {
                this.color2Field = value;
            }
        }

        /// <remarks/>
        public byte GradientDirection
        {
            get
            {
                return this.gradientDirectionField;
            }
            set
            {
                this.gradientDirectionField = value;
            }
        }

        /// <remarks/>
        public byte GradientType
        {
            get
            {
                return this.gradientTypeField;
            }
            set
            {
                this.gradientTypeField = value;
            }
        }

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }
    }


}