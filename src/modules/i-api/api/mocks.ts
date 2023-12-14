import { DocumentationRespType } from './types'

export const documentations: DocumentationRespType = {
    data: [
        {
            documentation_id: '7432470b-681b-498d-94a3-c75040b5af8a',
            documentation_type: 'TECHNICAL',
            summary: 'una frase de ejemplo',
            options: ['SUMMARY'],
        },
        {
            documentation_id: 'a1b2c3d4-e5f6-4a5b-9c8d-1e2f3a4b5c6d',
            documentation_type: 'USER_GUIDE',
            summary: 'A comprehensive guide for beginners',
            options: ['DETAILS', 'EXAMPLES', 'FAQs'],
        },
        {
            documentation_id: 'b5a4c3d2-e1f6-4b5a-9c8d-2e3f4a5b6c7d',
            documentation_type: 'REFERENCE_MANUAL',
            summary: 'Detailed technical specifications',
            options: ['SPECIFICATIONS', 'USAGE', 'TROUBLESHOOTING'],
        },
        {
            documentation_id: '98765432-abcdef-1234-5678-fedcba987654',
            documentation_type: 'RELEASE_NOTES',
            summary: 'Latest software release updates',
            options: ['HIGHLIGHTS', 'FIXES', 'KNOWN_ISSUES'],
        },
        {
            documentation_id: 'abcdef12-9876-5678-4321-fedcba123456',
            documentation_type: 'INSTALLATION_GUIDE',
            summary: 'Step-by-step installation instructions',
            options: [
                'SYSTEM_REQUIREMENTS',
                'INSTALLATION_STEPS',
                'CONFIGURATION',
            ],
        },
        {
            documentation_id: '12345678-fedcba-5678-abcdef-87654321',
            documentation_type: 'FAQ',
            summary: 'Frequently asked questions',
            options: ['GENERAL', 'TROUBLESHOOTING', 'USAGE_TIPS'],
        },
        {
            documentation_id: 'a1b2c3d4-5678-9abc-def1-23456789abcd',
            documentation_type: 'TROUBLESHOOTING_GUIDE',
            summary: 'Resolving common issues and errors',
            options: ['ERROR_CODES', 'DEBUGGING_TIPS', 'COMMON_ISSUES'],
        },
        {
            documentation_id: '56789abc-def1-2345-a1b2-c3d45678ef12',
            documentation_type: 'VIDEO_TUTORIAL',
            summary: 'Visual guides for effective use',
            options: ['GETTING_STARTED', 'ADVANCED_FEATURES', 'BEST_PRACTICES'],
        },
        {
            documentation_id: 'def12345-6789-abcd-5678-90abcdef1234',
            documentation_type: 'CASE_STUDY',
            summary: 'Real-world scenarios and solutions',
            options: ['SCENARIO_1', 'SCENARIO_2', 'LESSONS_LEARNED'],
        },
    ],
}

export const roles: { label: string; value: string }[] = [
    { label: 'Negocio', value: 'business' },
    { label: 'Funcional', value: 'funcional' },
    { label: 'Técnico', value: 'tecnico' },
]

export const options: { label: string; value: string }[] = [
    {
        label: 'Resumen básico de la API',
        value: 'resumen',
    },
    {
        label: 'Listado e información básica de los endpoints definidos en la API',
        value: 'listado',
    },
    {
        label: 'Información detallada de los endpoints definidos en la API',
        value: 'informacion',
    },
]
