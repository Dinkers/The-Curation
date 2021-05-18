from django.contrib import admin

from main.models import City, Place, Submission, PlaceImage


class PlaceImageInline(admin.TabularInline):
    model = PlaceImage


class PlaceAdmin(admin.ModelAdmin):
    inlines = [
        PlaceImageInline,
    ]


admin.site.register(City)
admin.site.register(Submission)

admin.site.register(Place, PlaceAdmin)
admin.site.register(PlaceImage)
