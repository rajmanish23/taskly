# Generated by Django 5.1.1 on 2024-10-04 08:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_tag_task_set'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='task_set',
            field=models.ManyToManyField(blank=True, related_name='tags', to='api.task'),
        ),
    ]