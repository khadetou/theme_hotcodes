# -*- coding: utf-8 -*-

from odoo import api, fields, models


class CrmLead(models.Model):
    _inherit = "crm.lead"

    x_employee_count = fields.Selection(
        [
            ("1-10", "1-10 employés"),
            ("11-50", "11-50 employés"),
            ("51-200", "51-200 employés"),
            ("201-500", "201-500 employés"),
            ("500+", "500+ employés"),
        ],
        string="Nombre d'Employés",
        tracking=True,
    )

    x_industry = fields.Selection(
        [
            ("retail", "Commerce / Retail"),
            ("services", "Services"),
            ("manufacturing", "Industrie / Manufacturing"),
            ("technology", "Technologie / IT"),
            ("healthcare", "Santé"),
            ("education", "Éducation"),
            ("finance", "Finance / Banque"),
            ("real_estate", "Immobilier"),
            ("hospitality", "Hôtellerie / Restauration"),
            ("other", "Autre"),
        ],
        string="Secteur d'Activité",
        tracking=True,
    )

    @api.model_create_multi
    def create(self, vals_list):
        """Override create to send email notification for demo requests"""
        leads = super().create(vals_list)

        for lead in leads:
            # Check if this is a demo request (by name or other criteria)
            if lead.name == "Demo Request - Saytu":
                # Send email to admin/sales team
                lead._send_demo_request_notification()
                # Send confirmation email to customer
                lead._send_demo_request_confirmation()

        return leads

    def _send_demo_request_notification(self):
        """Send notification email to sales team about new demo request"""
        template = self.env.ref(
            "theme_hotcodes.email_template_demo_request_notification",
            raise_if_not_found=False,
        )
        if template:
            template.send_mail(self.id, force_send=True)

    def _send_demo_request_confirmation(self):
        """Send confirmation email to customer"""
        template = self.env.ref(
            "theme_hotcodes.email_template_demo_request_confirmation",
            raise_if_not_found=False,
        )
        if template and self.email_from:
            template.send_mail(self.id, force_send=True)
