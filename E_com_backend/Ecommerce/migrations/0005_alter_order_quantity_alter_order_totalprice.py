# Generated by Django 4.2.4 on 2023-09-07 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Ecommerce', '0004_product_seller_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='quantity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='totalprice',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
