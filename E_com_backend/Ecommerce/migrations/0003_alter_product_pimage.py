# Generated by Django 4.2.4 on 2023-09-09 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ecommerce', '0002_alter_product_pimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='pimage',
            field=models.FileField(blank=True, null=True, upload_to='images'),
        ),
    ]
